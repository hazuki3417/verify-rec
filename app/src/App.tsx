import React from "react";
import { Providers } from "@/components/Providers";
import { Preview } from "./exclude/Preview";
import {
	TransformComponent,
	TransformWrapper,
	useControls,
} from "react-zoom-pan-pinch";

export default function App() {
	return (
		<Providers>
			{/* 下記に配置するコンポーネントを適宜入れ替えて検証をするイメージで利用する */}
			example
			<TransformWrapper>
				<ControlPanel />
				<TransformComponent>
					<Preview src={"/sample2.dxf"} />
				</TransformComponent>
			</TransformWrapper>
		</Providers>
	);
}

const ControlPanel = () => {
	const { zoomIn, zoomOut } = useControls();
	return (
		<div className="tools">
			<button onClick={() => zoomIn()}>+</button>
			<button onClick={() => zoomOut()}>-</button>
		</div>
	);
};
