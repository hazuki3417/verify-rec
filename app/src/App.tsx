import React from "react";
import { Providers } from "./Providers";
import ImageRotateAndDownload2 from "./ImageRotate2";

export default function App() {
	return (
		<Providers>
			{/* 下記に配置するコンポーネントを適宜入れ替えて検証をするイメージで利用する */}
			example
			<ImageRotateAndDownload2 />
		</Providers>
	);
}
