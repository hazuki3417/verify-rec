import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Styles } from "./styles";
import "@excalidraw/excalidraw/index.css";
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Styles />
		<App />
	</StrictMode>,
);
