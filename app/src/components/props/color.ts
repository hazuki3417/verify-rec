import { theme } from "@/theme";

export type MainColor = keyof typeof theme.color.main;
export type BaseColor = keyof typeof theme.color.base;
export type SubColor = keyof typeof theme.color.sub;
export type StatusColor = keyof typeof theme.color.status;
export type Color = MainColor | BaseColor | SubColor | StatusColor;
export const color: Record<Color, string> = {
	...theme.color.main,
	...theme.color.base,
	...theme.color.sub,
	...theme.color.status,
};
