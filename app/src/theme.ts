// src/theme.ts
import { type DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
	colors: {
		primary: "var(--color-primary)",
		secondary: "var(--color-secondary)",
		text: "var(--color-text)",
		background: "var(--color-background)",
	},
	spacing: {
		sm: "var(--spacing-sm)",
		md: "var(--spacing-md)",
		lg: "var(--spacing-lg)",
	},
	font: {
		base: "var(--font-base)",
		size: "var(--font-size)",
	},
	radius: {
		sm: "var(--radius-sm)",
		md: "var(--radius-md)",
	},
};
