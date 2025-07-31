import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import type { ExcalidrawImageElement } from "@excalidraw/excalidraw/element/types";

export interface InputFormProps {}

export const InputForm = (props: InputFormProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();

	const onAddDraw = async () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const dataURL = canvas.toDataURL("image/png");
		const blob = await fetch(dataURL).then((res) => res.blob());

		const imageId = `sig-${Date.now()}`;
		const file = new File([blob], `${imageId}.png`, {
			type: "image/png",
		});

		if (!excalidrawAPI) return;

		excalidrawAPI.addFiles([
			{
				id: imageId,
				dataURL: dataURL,
				created: Date.now(),
				mimeType: "image/png",
			},
		]);

		console.debug("ugoita2");

		const imageElement: ExcalidrawImageElement = {
			id: imageId,
			type: "image",
			fileId: imageId,
			width: 200,
			height: 200,
			x: 100,
			y: 100,
			angle: 0,
			strokeColor: "black",
			backgroundColor: "transparent",
			fillStyle: "solid",
			strokeWidth: 1,
			strokeStyle: "solid",
			roughness: 0,
			opacity: 100,
			groupIds: [],
			roundness: null,
			seed: Math.floor(Math.random() * 100000),
			version: 1,
			versionNonce: Math.floor(Math.random() * 100000),
			isDeleted: false,
			locked: false,
			link: null,
			boundElements: [],
		};

		const currentElements = excalidrawAPI.getSceneElements();
		excalidrawAPI.updateScene({
			elements: [...currentElements, imageElement],
		});
	};

	const onDownload = async () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const dataURL = canvas.toDataURL("image/png");
		const blob = await fetch(dataURL).then((res) => res.blob());

		const imageId = crypto.randomUUID();
		const file = new File([blob], `${imageId}.png`, {
			type: "image/png",
		});

		const url = URL.createObjectURL(file);
		const link = document.createElement("a");
		link.href = url;
		link.download = file.name;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// 解放
		URL.revokeObjectURL(url);
	};

	return (
		<div>
			<button onClick={onAddDraw}>add</button>
			<button onClick={onDownload}>download</button>
			<ExampleCanvas ref={canvasRef} />
			<div style={{width: "500px", height: "500px", overflow: "scroll"}}>

			<Excalidraw
				excalidrawAPI={(api) => setExcalidrawAPI(api)}
				initialData={{
					elements: excalidrawAPI?.getSceneElements(),
					files: excalidrawAPI?.getFiles(),
					appState: {
							...excalidrawAPI?.getAppState(),
							scrollX: 0,
							scrollY: 0,
					},
					scrollToContent: false,
				}}
			>
				<MainMenu>
					<MainMenu.DefaultItems.SaveAsImage />
					<MainMenu.DefaultItems.Help />
				</MainMenu>
			</Excalidraw>
			</div>
		</div>
	);
};

const ExampleCanvas = forwardRef<HTMLCanvasElement, {}>((props, ref) => {
	const innerRef = useRef<HTMLCanvasElement>(null);
	useImperativeHandle(ref, () => innerRef.current!);

	useEffect(() => {
		const canvas = innerRef.current;
		console.debug("ugoita?");

		if (!canvas) return;
		const size = 200;
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext("2d");

		if (!ctx) return;

		ctx.clearRect(0, 0, size, size);

		ctx.beginPath();
		ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
		ctx.strokeStyle = "#ff0000";
		ctx.lineWidth = 1;
		ctx.stroke();
	}, []);

	return (
		<div style={{ border: "1px solid #aaaaaa" }}>
			<canvas ref={innerRef} />
		</div>
	);
});
