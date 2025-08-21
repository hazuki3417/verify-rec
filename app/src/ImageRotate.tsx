import React, { useState } from "react";

/** 0/90/180/270 を想定（任意の角度でも動作しますが画質・補間の観点では90°刻み推奨） */
export type RotateDeg = 0 | 90 | 180 | 270;

/** createImageBitmap が使えない環境向けに <img> でフォールバック読み込み */
async function loadImageFallback(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    // ローカル File の場合 crossOrigin は不要。URL ソースに対しては CORS に注意。
    const loaded = new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
    img.src = url;
    await loaded;
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** EXIF を考慮して ImageBitmap または HTMLImageElement を取得 */
async function getBitmapOrImage(file: File): Promise<ImageBitmap | HTMLImageElement> {
  // 1) 可能なら EXIF を反映して ImageBitmap 化
  try {
    // 型定義が古い TS 環境ではオプションの型が無いことがあるため @ts-expect-error
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    // 2) 非対応環境では <img> フォールバック（EXIF 自動適用は期待できない）
    return await loadImageFallback(file);
  }
}

/** 回転後の Blob を生成（入力拡張子に合わせて JPEG/PNG を自動選択） */
export async function buildRotatedImageBlob(
  file: File,
  rotation: number,            // 任意の角度（0/90/180/270 を推奨）
  jpegQuality: number = 0.92,  // JPEG の再エンコード品質
  jpegBackground?: string,     // JPEG 透過対策の下地色（例: "#fff"）
): Promise<Blob> {
  const source = await getBitmapOrImage(file);
  const width = "width" in source ? source.width : (source as any).width;
  const height = "height" in source ? source.height : (source as any).height;

  const rad = (rotation % 360) * Math.PI / 180;
  const is90or270 = Math.abs(rotation % 180) === 90;

  const canvas = document.createElement("canvas");
  canvas.width  = is90or270 ? height : width;
  canvas.height = is90or270 ? width  : height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  // JPEG に出力する場合、透過が黒く“見える”のを防ぎたいときは下地を塗る
  const isJpeg = /jpe?g$/i.test(file.name) || file.type === "image/jpeg";
  if (isJpeg && jpegBackground) {
    ctx.save();
    ctx.fillStyle = jpegBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rad);
  // drawImage は ImageBitmap と HTMLImageElement の両方を受け付ける
  // 型消しのため any キャスト
  ctx.drawImage(source as any, -width / 2, -height / 2);

  const mime = isJpeg ? "image/jpeg" : "image/png";
  const quality = isJpeg ? jpegQuality : undefined;

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), mime, quality);
  });
  return blob;
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

/** 例：React コンポーネント */
export default function ImageRotateAndDownload() {
  const [file, setFile] = useState<File | null>(null);
  const [deg, setDeg] = useState<RotateDeg>(0);
  const [busy, setBusy] = useState(false);

  const onPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setDeg(0);
  };

  const rotateLeft = () => setDeg((d) => ((d + 270) % 360) as RotateDeg);

  const onDownload = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const blob = await buildRotatedImageBlob(file, deg, 0.92, "#fff"); // JPEG 背景を白にする例
      const base = file.name.replace(/\.(jpe?g|png|webp|gif|bmp|tiff?)$/i, "");
      const ext  = blob.type === "image/jpeg" ? "jpg" : "png";
      downloadBlob(blob, `rotated-${base}.${ext}`);
    } catch (e) {
      console.debug("error", e)
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input type="file" accept="image/*" onChange={onPick} />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={rotateLeft} disabled={!file || busy}>左に90°</button>
        <button type="button" onClick={onDownload} disabled={!file || busy}>
          {busy ? "処理中…" : "回転してダウンロード"}
        </button>
      </div>
      <div>現在の角度: {deg}°</div>
    </div>
  );
}
