import React, { useState, useMemo } from "react";

/** 0/90/180/270 を想定（任意角度でも動くが画質面は 90° 刻み推奨） */
export type RotateDeg = 0 | 90 | 180 | 270;

/** src から Blob を取得（data:, blob:, http(s): すべて対応） */
async function fetchBlobFromSrc(src: string): Promise<Blob> {
	if (src.startsWith("data:")) {
		// dataURL → Blob
		const [meta, b64] = src.split(",", 2);
		const mime =
			/data:(.*?);base64/.exec(meta)?.[1] ?? "application/octet-stream";
		const bin = atob(b64);
		const u8 = new Uint8Array(bin.length);
		for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
		return new Blob([u8], { type: mime });
	}

	// blob: / http(s): → fetch
	const res = await fetch(src, { mode: "cors" });
	if (!res.ok)
		throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
	return await res.blob();
}

/** EXIF を考慮して ImageBitmap（推奨）または HTMLImageElement を取得 */
async function getBitmapOrImageFromSrc(
	src: string,
): Promise<ImageBitmap | HTMLImageElement> {
	const blob = await fetchBlobFromSrc(src);

	if ("createImageBitmap" in window) {
		try {
			// EXIF Orientation を反映（未対応環境は catch）
			// 型定義が古い TS だと型エラーになることがあるためコメント化
			// return await createImageBitmap(blob, { imageOrientation: "from-image" as any });
			return await (createImageBitmap as any)(blob, {
				imageOrientation: "from-image",
			});
		} catch {
			return await createImageBitmap(blob);
		}
	}

	// フォールバック：<img> 経由で読み込み
	const url = URL.createObjectURL(blob);
	try {
		const img = new Image();
		// 他ドメインを描画・エクスポートしたい場合はサーバが CORS 許可している必要がある
		img.crossOrigin = "anonymous";
		await new Promise<void>((resolve, reject) => {
			img.onload = () => resolve();
			img.onerror = () => reject(new Error("Failed to load image element"));
			img.src = url;
		});
		return img;
	} finally {
		URL.revokeObjectURL(url);
	}
}

/** src を起点に回転後の Blob を生成（JPEG/PNG を自動選択） */
export async function buildRotatedImageBlobFromSrc(
	src: string,
	rotation: number, // 任意角度（0/90/180/270 推奨）
	jpegQuality: number = 0.92, // JPEG 再エンコード品質
	jpegBackground?: string, // JPEG の透過対策色（例: "#fff"）
): Promise<{ blob: Blob; suggestedName: string }> {
	const source = await getBitmapOrImageFromSrc(src);
	const iw = "width" in source ? source.width : (source as any).width;
	const ih = "height" in source ? source.height : (source as any).height;

	const rad = ((rotation % 360) * Math.PI) / 180;
	const is90or270 = Math.abs(rotation % 180) === 90;

	const canvas = document.createElement("canvas");
	canvas.width = is90or270 ? ih : iw;
	canvas.height = is90or270 ? iw : ih;

	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas 2D context unavailable");

	// 出力形式は入力の MIME 優先、無ければ拡張子から類推、最後に PNG
	const fetchedBlob = await fetchBlobFromSrc(src);
	const inputMime = fetchedBlob.type || "";
	const isJpegLike = inputMime === "image/jpeg" || /\.jpe?g($|\?)/i.test(src);
	const mime = isJpegLike ? "image/jpeg" : "image/png";

	if (mime === "image/jpeg" && jpegBackground) {
		ctx.save();
		ctx.fillStyle = jpegBackground;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.restore();
	}

	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(rad);
	ctx.drawImage(source as any, -iw / 2, -ih / 2);

	const blob: Blob = await new Promise((resolve, reject) => {
		canvas.toBlob(
			(b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
			mime,
			mime === "image/jpeg" ? jpegQuality : undefined,
		);
	});

	// ダウンロード名を URL から推定
	let base = "image";
	try {
		const u = new URL(src, location.href);
		const last = u.pathname.split("/").pop() || "";
		base = last.replace(/\.(jpe?g|png|webp|gif|bmp|tiff?)$/i, "") || base;
	} catch {
		/* ignore */
	}
	const ext = blob.type === "image/jpeg" ? "jpg" : "png";
	return { blob, suggestedName: `rotated-${base}.${ext}` };
}

/** Blob をダウンロード（ファイル名指定） */
export function downloadBlob(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

/** React 例：`img.src` の値を使って回転→ダウンロード */
export default function ImageRotateAndDownloadFromSrc() {
	const [src, setSrc] = useState<string>("");
	const [deg, setDeg] = useState<RotateDeg>(0);
	const [busy, setBusy] = useState(false);

	// 参考：既存の <img id="target"> の src を拾いたい場合
	const pickFromExistingImg = () => {
		const el = document.getElementById("target") as HTMLImageElement | null;
		if (el?.src) setSrc(el.src);
	};

	const rotateLeft = () => setDeg((d) => ((d + 270) % 360) as RotateDeg);

	const onDownload = async () => {
		if (!src) return;
		setBusy(true);
		try {
			const { blob, suggestedName } = await buildRotatedImageBlobFromSrc(
				src,
				deg,
				0.92,
				"#fff",
			);
			downloadBlob(blob, suggestedName);
		} catch (e) {
			console.error(e);
			alert("画像の処理に失敗しました（CORS 設定などをご確認ください）");
		} finally {
			setBusy(false);
		}
	};

	const preview = useMemo(() => src, [src]);

	return (
		<div style={{ display: "grid", gap: 8, maxWidth: 520 }}>
			<div style={{ display: "flex", gap: 8 }}>
				<input
					type="text"
					placeholder="img の src（URL / dataURL / blob URL）を入力"
					value={src}
					onChange={(e) => setSrc(e.target.value)}
					style={{ flex: 1 }}
				/>
				<button type="button" onClick={pickFromExistingImg}>
					#target から取得
				</button>
			</div>

			{preview && (
				<img
					src={preview}
					alt="preview"
					style={{
						maxWidth: "100%",
						maxHeight: 240,
						objectFit: "contain",
						border: "1px solid #ddd",
					}}
					crossOrigin="anonymous"
				/>
			)}

			<div style={{ display: "flex", gap: 8 }}>
				<button type="button" onClick={rotateLeft} disabled={!src || busy}>
					左に90°
				</button>
				<button type="button" onClick={onDownload} disabled={!src || busy}>
					{busy ? "処理中…" : "回転してダウンロード"}
				</button>
			</div>
			<div>現在の角度: {deg}°</div>
		</div>
	);
}
