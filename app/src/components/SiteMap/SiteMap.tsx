import { NavLink } from "react-router";

export const SiteMap = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <NavLink to="/">home</NavLink>
      <NavLink to="/page1">page 1</NavLink>
      <NavLink to="/page2">page 2</NavLink>
    </div>
  );
};
