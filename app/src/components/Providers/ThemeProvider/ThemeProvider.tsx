import React from "react";
import { ThemeProvider as BaseProvider } from "styled-components";
import { theme } from "@/theme";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;
  return <BaseProvider theme={theme}>{children}</BaseProvider>;
};
