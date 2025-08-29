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

  const padding = 12; //
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dxfData, setDxfData] = useState<any | null>(null);
  const [scene] = useState(new Scene());
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const cameraRef = useRef<OrthographicCamera | null>(null);

  // 基準のバウンディングサイズを保持
  const [baseSize, setBaseSize] = useState<{ w: number; h: number } | null>(
    null,
  );

  // DXF 読み込み
  useEffect(() => {
    const loadDXF = async () => {
      if (!src) return;
      const font = "/fonts/helvetiker_regular.typeface.json";
      try {
        const viewer = new DXFViewer();
        const dxf =
          typeof src === "string"
            ? await viewer.getFromPath(src, font)
            : await viewer.getFromFile(src, font);

        scene.clear();
        scene.add(dxf);
        setDxfData(dxf);

        // 読み込み直後に基準サイズを保存
        const box = new Box3().setFromObject(scene);
        if (!box.isEmpty()) {
          const size = new Vector3();
          box.getSize(size);
          setBaseSize({ w: size.x, h: size.y });
        }
      } catch (error) {
        console.error("Error loading DXF file:", error);
      }
    };
    loadDXF();
  }, [src, scene]);

  // 初期化
  useEffect(() => {
    if (!canvasRef.current) return;
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

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, [scene]);

  // fit & 回転処理
  useEffect(() => {
    if (!dxfData || !rendererRef.current || !cameraRef.current || !baseSize)
      return;

    const renderer = rendererRef.current;
    const camera = cameraRef.current;

    renderer.setSize(width, height, false);

    // 基準サイズを回転させたときの幅・高さを計算
    const rad = (rotate * Math.PI) / 180;
    const rotatedW =
      Math.abs(baseSize.w * Math.cos(rad)) +
      Math.abs(baseSize.h * Math.sin(rad));
    const rotatedH =
      Math.abs(baseSize.w * Math.sin(rad)) +
      Math.abs(baseSize.h * Math.cos(rad));

    // 有効描画領域（padding を除いた部分）
    const innerW = width - padding * 2;
    const innerH = height - padding * 2;

    const scale = Math.min(innerW / rotatedW, innerH / rotatedH);

    camera.left = -width / 2 / scale;
    camera.right = width / 2 / scale;
    camera.top = height / 2 / scale;
    camera.bottom = -height / 2 / scale;

    // DXF の中心を計算（基準 box の center を使用）
    const box = new Box3().setFromObject(scene);
    const center = box.getCenter(new Vector3());
    camera.position.set(center.x, center.y, center.z + 100);
    camera.lookAt(center);
    camera.updateProjectionMatrix();

    // シーンを回転
    scene.rotation.set(0, 0, rad);
  }, [dxfData, rotate, scene, baseSize, width, height, padding]);

  return <canvas ref={canvasRef} width={width} height={height} {...rest} />;
};
