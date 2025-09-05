import React from "react";
import { useNavigate } from "react-router";

export default function Root() {
  const navigate = useNavigate();

  const query = new URLSearchParams({
    key: "aaaaa%0Abbbbb",
  });

  return (
    <button
      onClick={() => {
        navigate(`?${query.toString()}`);
      }}
    >
      click
    </button>
  );
}
