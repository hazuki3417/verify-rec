import { css } from "styled-components";
import {
	styleResolver,
	type ResolverStyleMapArg,
	type StyledProps,
	type StyleMap,
} from "./resolver";

export type TextLineMode = "single" | "multi";
export type TextOverflowMode = "normal" | "ellipsis" | "scrollX";

export type TextLineModeProp = { lineMode?: TextLineMode };
export type TextOverflowModeProp = { overflowMode?: TextOverflowMode };

export interface TextStyleProps
	extends TextLineModeProp,
		TextOverflowModeProp {}

export type TextLineModeStyleMap = StyleMap<TextLineMode>;
export type TextOverflowModeStyleMap = StyleMap<TextOverflowMode>;

export const textLineModeStyleMap: TextLineModeStyleMap = {
	multi: {
		overflowWrap: "break-word",
		wordBreak: "break-word",
	},
	single: {
		overflow: "hidden",
		whiteSpace: "nowrap",
	},
};

export const textOverflowModeStyleMap: TextOverflowModeStyleMap = {
	normal: {
		// NOTE: 要素側のデフォルトスタイルを利用するためcssの指定なし
	},
	ellipsis: {
		textOverflow: "ellipsis",
	},
	scrollX: {
		overflowX: "scroll",
	},
};

/**
 * propsの値に対応するcss propertiesを返す関数群
 * NOTE: ここで指定している初期値はprop基準の初期値
 */

export const resolveTextLineMode = (arg: ResolverStyleMapArg<TextLineMode>) => {
	const { prop, style } = arg;
	return styleResolver(prop, style, "multi");
};

export const resolveTextOverflowMode = (
	arg: ResolverStyleMapArg<TextOverflowMode>,
) => {
	const { prop, style } = arg;
	return styleResolver(prop, style, "normal");
};

/**
 * NOTE: text関連のpropsはあらゆるコンポーネントで提供したい可能性があるため下記の処理を提供する部品を実装
 *       - props名
 *       - props値の解決
 *       - css propertiesの解決
 * NOTE: 各propsのtokenをベースにしているため外部から渡す必要がないように実装
 * NOTE: i/fの形式を統一するために引数はオブジェクト型にしています。
 */

export const cssTextLineMode = (args?: { defaultValue?: TextLineMode }) => css<
	StyledProps<TextLineModeProp>
>`
  ${({ $lineMode }) =>
		css(
			resolveTextLineMode({
				prop: $lineMode ?? args?.defaultValue,
				style: textLineModeStyleMap,
			}),
		)}
`;

export const cssTextOverflowMode = (args?: {
	defaultValue?: TextOverflowMode;
}) => css<StyledProps<TextOverflowModeProp>>`
  ${({ $overflowMode }) =>
		css(
			resolveTextOverflowMode({
				prop: $overflowMode ?? args?.defaultValue,
				style: textOverflowModeStyleMap,
			}),
		)}
`;
