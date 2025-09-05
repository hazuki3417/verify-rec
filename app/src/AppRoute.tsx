import React from "react";
import { Route, Routes } from "react-router";
import Root from "./page/Root";

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
    </Routes>
  );
}
