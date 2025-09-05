import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Styles } from "./styles";
import "@excalidraw/excalidraw/index.css";
import { BrowserRouter } from "react-router";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Styles />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
