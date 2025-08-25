import { type CSSProperties } from "react";
import { useTheme, type DefaultTheme } from "styled-components";

export type ThemeStyle =
	| ((theme: DefaultTheme) => CSSProperties)
	| CSSProperties;

export interface StylableProp {
	style?: ThemeStyle;
}

export const resolveStyle = (style: ThemeStyle | undefined): CSSProperties => {
	const theme = useTheme();
	return typeof style === "function" ? style(theme) : (style ?? {});
};
