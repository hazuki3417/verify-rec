import React, {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import {
  Box3,
  Color,
  LinearToneMapping,
  OrthographicCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
// @ts-ignore
import { DXFViewer } from "three-dxf-viewer";

export type DxfPreviewProps = Omit<
  ComponentPropsWithoutRef<"canvas">,
  "width" | "height"
> & {
  src: string | File;
  rotate: number; // 回転角度（deg）
  width: number; // 描画領域の幅（px）
  height: number; // 描画領域の高さ（px）
};

export const DxfPreview = (props: DxfPreviewProps) => {
  const { src, rotate, width, height, ...rest } = props;

  /**
   * NOTE: エンティティの数がおおいと負荷が大きくなりブラウザが止まる
   *       そのためentity limitやtimeoutを設けています
   */
  const entityLimit = 20000;
  const timeoutMs = 3000;

  const padding = 12;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dxfData, setDxfData] = useState<any | null>(null);
  const [scene] = useState(new Scene());
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const cameraRef = useRef<OrthographicCamera | null>(null);

  const [baseSize, setBaseSize] = useState<{ w: number; h: number } | null>(
    null,
  );
  const [isTooLarge, setIsTooLarge] = useState(false);

  // ========== DXF 読み込み ==========
  useEffect(() => {
    const loadDXF = async () => {
      if (!src) return;
      const font = "/fonts/helvetiker_regular.typeface.json";

      try {
        const viewer = new DXFViewer();

        // タイムアウト付きで読み込み
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);

        const dxf =
          typeof src === "string"
            ? await viewer.getFromPath(src, font)
            : await viewer.getFromFile(src, font);

        clearTimeout(timeout);

        // エンティティ数チェック
        const entityCount = dxf.children?.length ?? 0;
        if (entityCount > entityLimit) {
          console.warn(
            `DXF entity count (${entityCount}) exceeds limit (${entityLimit})`,
          );
          setIsTooLarge(true);
          return;
        }

        scene.clear();
        scene.add(dxf);
        setDxfData(dxf);

        // 基準サイズの計算（Box3は小さな図面でのみ実行）
        const start = performance.now();
        const box = new Box3().setFromObject(scene);
        if (performance.now() - start > timeoutMs) {
          console.warn("Box3 calculation aborted due to timeout");
          setIsTooLarge(true);
          return;
        }

        if (!box.isEmpty()) {
          const size = new Vector3();
          box.getSize(size);
          setBaseSize({ w: size.x, h: size.y });
        }
      } catch (error) {
        console.error("Error loading DXF file:", error);
        setIsTooLarge(true);
      }
    };

    loadDXF();
  }, [src, scene, entityLimit, timeoutMs]);

  // ========== 初期化 ==========
  useEffect(() => {
    if (!canvasRef.current || isTooLarge) return;

    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      preserveDrawingBuffer: true,
    });
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = LinearToneMapping;
    renderer.toneMappingExposure = 3;

    scene.background = new Color(0xffffff);

    const camera = new OrthographicCamera();
    camera.near = -10000;
    camera.far = 10000;

    rendererRef.current = renderer;
    cameraRef.current = camera;

    let stop = false;

    const animate = () => {
      if (stop) return;
      requestAnimationFrame(animate);

      // レンダリング時間が長くなりすぎた場合は停止
      const start = performance.now();
      renderer.render(scene, camera);
      if (performance.now() - start > timeoutMs) {
        console.warn("Rendering aborted due to timeout");
        setIsTooLarge(true);
        stop = true;
      }
    };
    animate();

    return () => {
      stop = true;
      renderer.dispose();
    };
  }, [scene, isTooLarge, timeoutMs]);

  // ========== fit & 回転処理 ==========
  useEffect(() => {
    if (
      !dxfData ||
      !rendererRef.current ||
      !cameraRef.current ||
      !baseSize ||
      isTooLarge
    )
      return;

    const renderer = rendererRef.current;
    const camera = cameraRef.current;

    renderer.setSize(width, height, false);

    const rad = (rotate * Math.PI) / 180;
    const rotatedW =
      Math.abs(baseSize.w * Math.cos(rad)) +
      Math.abs(baseSize.h * Math.sin(rad));
    const rotatedH =
      Math.abs(baseSize.w * Math.sin(rad)) +
      Math.abs(baseSize.h * Math.cos(rad));

    const innerW = width - padding * 2;
    const innerH = height - padding * 2;

    const scale = Math.min(innerW / rotatedW, innerH / rotatedH);

    camera.left = -width / 2 / scale;
    camera.right = width / 2 / scale;
    camera.top = height / 2 / scale;
    camera.bottom = -height / 2 / scale;

    // Box3計算も重いのでタイムアウトつきで実行
    const start = performance.now();
    const box = new Box3().setFromObject(scene);
    if (performance.now() - start > timeoutMs) {
      console.warn("Box3 calculation aborted due to timeout");
      setIsTooLarge(true);
      return;
    }

    const center = box.getCenter(new Vector3());
    camera.position.set(center.x, center.y, center.z + 100);
    camera.lookAt(center);
    camera.updateProjectionMatrix();

    scene.rotation.set(0, 0, rad);
  }, [
    dxfData,
    rotate,
    scene,
    baseSize,
    width,
    height,
    padding,
    isTooLarge,
    timeoutMs,
  ]);

  if (isTooLarge) {
    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8f8f8",
          color: "#444",
          fontSize: 14,
        }}
      >
        DXF ファイルが大きすぎるか、処理がタイムアウトしたため描画できません
      </div>
    );
  }

  return <canvas ref={canvasRef} width={width} height={height} {...rest} />;
};
