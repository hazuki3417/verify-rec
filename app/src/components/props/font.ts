import { css } from "styled-components";
import { theme } from "@/theme";
import { color, type Color } from "./color";
import {
	styleResolver,
	type ResolverStyleMapArg,
	type StyleMap,
} from "./resolver";

export type FontColor = Color;
export type FontSize = keyof typeof theme.font.size;
export type FontLineHeight = keyof typeof theme.font.lineHight;
export type FontWeight = keyof typeof theme.font.weight;

export type FontColorProp = { $fontColor?: FontColor };
export type FontSizeProp = { $fontSize?: FontSize };
export type FontLineHeightProp = { $fontLineHeight?: FontLineHeight };
export type FontWeightProp = { $fontWeight?: FontWeight };

export interface FontStyleProps
	extends FontColorProp,
		FontSizeProp,
		FontLineHeightProp,
		FontWeightProp {}

export type FontColorStyleMap = StyleMap<FontColor>;
export type FontSizeStyleMap = StyleMap<FontSize>;
export type FontLineHeightStyleMap = StyleMap<FontLineHeight>;
export type FontWeightStyleMap = StyleMap<FontWeight>;

/**
 * themeからコンポーネント内で利用するtokenを作成
 */

export const fontColorStyleMap = Object.fromEntries(
	Object.entries(color).map(([key, value]) => [key, { color: value }]),
) as FontColorStyleMap;

export const fontSizeStyleMap = Object.fromEntries(
	Object.entries(theme.font.size).map(([key, value]) => [
		key,
		{ fontSize: value },
	]),
) as FontSizeStyleMap;

export const fontLineHeightStyleMap = Object.fromEntries(
	Object.entries(theme.font.lineHight).map(([key, value]) => [
		key,
		{ lineHeight: value },
	]),
) as FontLineHeightStyleMap;

export const fontWeightStyleMap = Object.fromEntries(
	Object.entries(theme.font.weight).map(([key, value]) => [
		key,
		{ fontWeight: value },
	]),
) as FontWeightStyleMap;

/**
 * propsの値に対応するcss propertiesを返す関数群
 * NOTE: ここで指定している初期値はprop基準の初期値
 */

export const resolveFontColor = (arg: ResolverStyleMapArg<FontColor>) => {
	const { prop, style } = arg;
	return styleResolver(prop, style, "riverBlue");
};

export const resolveFontSize = (arg: ResolverStyleMapArg<FontSize>) => {
	const { prop, style } = arg;
	return styleResolver(prop, style, "14");
};

export const resolveFontLineHeight = (
	arg: ResolverStyleMapArg<FontLineHeight>,
) => {
	const { prop, style } = arg;
	return styleResolver(prop, style, "160");
};

export const resolveFontWeight = (arg: ResolverStyleMapArg<FontWeight>) => {
	const { prop, style } = arg;
	return styleResolver(prop, style, "regular");
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
				prop: $fontColor ?? args?.defaultValue,
				style: fontColorStyleMap,
			}),
		)}
`;

export const cssFontSize = (args?: {
	defaultValue?: FontSize;
}) => css<FontSizeProp>`
  ${({ $fontSize }) =>
		css(
			resolveFontSize({
				prop: $fontSize ?? args?.defaultValue,
				style: fontSizeStyleMap,
			}),
		)}
`;

export const cssFontLineHeight = (args?: {
	defaultValue?: FontLineHeight;
}) => css<FontLineHeightProp>`
  ${({ $fontLineHeight }) =>
		css(
			resolveFontLineHeight({
				prop: $fontLineHeight ?? args?.defaultValue,
				style: fontLineHeightStyleMap,
			}),
		)}
`;

export const cssFontWeight = (args?: {
	defaultValue?: FontWeight;
}) => css<FontWeightProp>`
  ${({ $fontWeight }) =>
		css(
			resolveFontWeight({
				prop: $fontWeight ?? args?.defaultValue,
				style: fontWeightStyleMap,
			}),
		)}
`;
