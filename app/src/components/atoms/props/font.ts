import { css } from "styled-components";
import { theme } from "../../../theme";
import type { Color } from "./color";
import { valueResolver, type ResolverArg, type Token } from "./resolver";

export type FontColor = Color;
export type FontSize = keyof typeof theme.font.size;
export type FontLineHeight = keyof typeof theme.font.lineHight;
export type FontWeight = keyof typeof theme.font.weight;

export type FontColorProp = { $fontColor?: FontColor };
export type FontSizeProp = { $fontSize?: FontSize };
export type FontLineHeightProp = { $fontLineHeight?: FontLineHeight };
export type FontWeightProp = { $fontWeight?: FontWeight };

export interface FontProps
	extends FontColorProp,
		FontSizeProp,
		FontLineHeightProp,
		FontWeightProp {}

export type FontColorToken = Token<FontColor>;
export type FontSizeToken = Token<FontSize>;
export type FontLineHeightToken = Token<FontLineHeight>;
export type FontWeightToken = Token<FontWeight>;

/**
 * themeからコンポーネント内で利用するtokenを作成
 */

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

/**
 * propsの値に対応するcss propertiesを返す関数群
 * NOTE: ここで指定している初期値はprop基準の初期値
 */

export const resolveFontColor = (arg: ResolverArg<FontColor>) => {
	const { value, token } = arg;
	return valueResolver(value, token, "baseRiverBlue");
};

export const resolveFontSize = (arg: ResolverArg<FontSize>) => {
	const { value, token } = arg;
	return valueResolver(value, token, "14");
};

export const resolveFontLineHeight = (arg: ResolverArg<FontLineHeight>) => {
	const { value, token } = arg;
	return valueResolver(value, token, "160");
};

export const resolveFontWeight = (arg: ResolverArg<FontWeight>) => {
	const { value, token } = arg;
	return valueResolver(value, token, "regular");
};

/**
 * NOTE: font関連のpropsはあらゆるコンポーネントで提供したい可能性があるため下記の処理を提供する部品を実装
 *       - props名
 *       - props値の解決
 *       - css propertiesの解決
 * NOTE: 各propsのtokenをベースにしているため外部から渡す必要がないように実装
 * NOTE: i/fの形式を統一するために引数はオブジェクト型にしています。
 */

export const cssFontColor = (args?: {
	defaultValue?: FontColor;
}) => css<FontColorProp>`
  ${({ $fontColor }) =>
		css(
			resolveFontColor({
				value: $fontColor ?? args?.defaultValue,
				token: fontColorToken,
			}),
		)}
`;

export const cssFontSize = (args?: {
	defaultValue?: FontSize;
}) => css<FontSizeProp>`
  ${({ $fontSize }) =>
		css(
			resolveFontSize({
				value: $fontSize ?? args?.defaultValue,
				token: fontSizeToken,
			}),
		)}
`;

export const cssFontLineHeight = (args?: {
	defaultValue?: FontLineHeight;
}) => css<FontLineHeightProp>`
  ${({ $fontLineHeight }) =>
		css(
			resolveFontLineHeight({
				value: $fontLineHeight ?? args?.defaultValue,
				token: fontLineHeightToken,
			}),
		)}
`;

export const cssFontWeight = (args?: {
	defaultValue?: FontWeight;
}) => css<FontWeightProp>`
  ${({ $fontWeight }) =>
		css(
			resolveFontWeight({
				value: $fontWeight ?? args?.defaultValue,
				token: fontWeightToken,
			}),
		)}
`;
