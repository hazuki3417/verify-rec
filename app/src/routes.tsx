import React from "react";
import { createRoutesFromElements, Route } from "react-router";
import RootLayout from "./RootLayout";
import Home from "./page/Home";
import Page1 from "./page/Page1";
import Page2 from "./page/Page2";

const loader = async () => {
  return {
    user: "guest",
  };
};

const routes = createRoutesFromElements(
  <Route path="/" loader={loader} element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path="page1" element={<Page1 />} />
    <Route path="page2" element={<Page2 />} />
  </Route>,
);
export default routes;
