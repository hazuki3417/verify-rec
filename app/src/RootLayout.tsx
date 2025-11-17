import React, { StrictMode } from "react";
import "@excalidraw/excalidraw/index.css";
import { Outlet } from "react-router";
import { Providers } from "./components/Providers";
import { Styles } from "./styles";

export default function RootLayout() {
  return (
    <StrictMode>
      <Providers>
        <Styles />
        <Outlet />
        <div id="portal"></div>
      </Providers>
    </StrictMode>
  );
}
