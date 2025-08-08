import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

export interface ProvidersProps {
	children: React.ReactNode;
}

export const Providers = (props: ProvidersProps) => {
	const { children } = props;
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
