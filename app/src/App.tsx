import React from "react";
import { Providers } from "@/components/Providers";
import AppRoute from "./AppRoute";

export default function App() {
  return (
    <Providers>
      <AppRoute />
    </Providers>
  );
}
