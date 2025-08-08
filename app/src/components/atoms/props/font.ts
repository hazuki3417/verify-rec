import { theme } from "../../../theme";
import type { Color } from "./color";
import { resolver, type ResolverArg, type Token } from "./resolver";

export type FontColor = Color;
export type FontSize = keyof typeof theme.font.size;
export type FontLineHeight = keyof typeof theme.font.lineHight;
export type FontWeight = keyof typeof theme.font.weight;

export type FontColorToken = Token<FontColor>;
export type FontSizeToken = Token<FontSize>;
export type FontLineHeightToken = Token<FontLineHeight>;
export type FontWeightToken = Token<FontWeight>;

export type FontProp = {
	fontColor?: FontColor;
	fontSize?: FontSize;
	fontLineHeight?: FontLineHeight;
	fontWeight?: FontWeight;
};

export const fontColorToken = Object.fromEntries(
	Object.entries(theme.color).map(([key, value]) => [key, { color: value }]),
) as FontColorToken;

export const fontSizeToken = Object.fromEntries(
	Object.entries(theme.font.size).map(([key, value]) => [
		key,
		{ fontSize: value },
	]),
) as FontSizeToken;

export const fontLineHeightToken = Object.fromEntries(
	Object.entries(theme.font.lineHight).map(([key, value]) => [
		key,
		{ lineHeight: value },
	]),
) as FontLineHeightToken;

export const fontWeightToken = Object.fromEntries(
	Object.entries(theme.font.weight).map(([key, value]) => [
		key,
		{ fontWeight: value },
	]),
) as FontWeightToken;

export const resolveFontColor = (arg: ResolverArg<FontColor>) => {
	const { value, token } = arg;
	return resolver(value, token, "baseRiverBlue");
};

export const resolveFontSize = (arg: ResolverArg<FontSize>) => {
	const { value, token } = arg;
	return resolver(value, token, "14");
};

export const resolveFontLineHeight = (arg: ResolverArg<FontLineHeight>) => {
	const { value, token } = arg;
	return resolver(value, token, "160");
};

export const resolveFontWeight = (arg: ResolverArg<FontWeight>) => {
	const { value, token } = arg;
	return resolver(value, token, "regular");
};
