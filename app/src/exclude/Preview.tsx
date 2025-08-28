import React, {
	useEffect,
	useRef,
	useState,
	type ComponentPropsWithoutRef,
	type HTMLAttributes,
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

export type PreviewProps = ComponentPropsWithoutRef<"canvas"> & {
	src: any;
};

/**
 * DXFファイルを描画するコンポーネント
 * @param {Object} props コンポーネントproperties
 * @param {string|File} props.src
 * @param {import("react").HTMLAttributes<HTMLCanvasElement>} [props.rest]
 * @returns
 */
export const Preview = (props: PreviewProps) => {
	const { src, ...rest } = props;

	const srcTypeChecks = [typeof src === "string", src instanceof File];

	if (!srcTypeChecks.some(Boolean)) {
		throw new Error("src must be a string or File");
	}

	const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [dxfData, setDxfData] = useState<any | null>(null);
	const [scene] = useState(new Scene());

	// Load DXF when src changes
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

				scene.clear(); // remove old objects before adding new
				scene.add(dxf);
				setDxfData(dxf);
			} catch (error) {
				console.error("Error loading DXF file:", error);
			}
		};

		loadDXF();
	}, [src, scene]);

	useEffect(() => {
		if (canvasRef.current === null) {
			return;
		}

		// renderer
		const renderer = new WebGLRenderer({
			canvas: canvasRef.current,
			preserveDrawingBuffer: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.outputColorSpace = SRGBColorSpace;
		renderer.toneMapping = LinearToneMapping;
		renderer.toneMappingExposure = 3;

		// scene
		scene.background = new Color(0xffffff);

		// camera
		const size = 10000;
		const aspect =
			canvasRef.current.offsetWidth / canvasRef.current.offsetHeight || 1;
		const camera = new OrthographicCamera(
			-size * aspect,
			size * aspect,
			size,
			-size,
			-size / 2,
			size,
		);

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};

		const centerCamera = () => {
			const box = new Box3().setFromObject(scene);

			// handle empty box case (e.g., failed load)
			if (!isFinite(box.min.x) || !isFinite(box.max.x)) {
				camera.position.set(0, 0, 100);
				camera.lookAt(new Vector3(0, 0, 0));
				camera.updateProjectionMatrix();
				return;
			}

			const bigAxis = box.max.x - box.min.x > box.max.y - box.min.y ? "x" : "y";
			const contentSize =
				bigAxis === "x" ? box.max.x - box.min.x : box.max.y - box.min.y;
			const frustumSize =
				bigAxis === "x"
					? camera.right - camera.left
					: camera.top - camera.bottom;

			const lateralMargin = 0.9; // 1 = no margin
			if (contentSize < frustumSize) {
				camera.zoom = lateralMargin * (frustumSize / contentSize);
			} else {
				camera.zoom = 1;
			}

			const center = box.min
				.clone()
				.add(box.max.clone().sub(box.min).multiplyScalar(0.5));

			// 固定の視点：Z+ 方向から真下を見る（回転・パンなし）
			camera.position.set(center.x, center.y, center.z + 100);
			camera.lookAt(center);
			camera.updateProjectionMatrix();
		};

		if (dxfData) centerCamera();
		animate();

		drawCanvasRef.current = renderer.domElement;

		return () => {
			renderer.dispose();
		};
	}, [dxfData, scene]);

	return <canvas ref={canvasRef} {...rest} />;
};
