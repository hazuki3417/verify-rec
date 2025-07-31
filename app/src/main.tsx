import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./css/token.css";
import "@excalidraw/excalidraw/index.css"
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
