import { css } from "styled-components";
import { valueResolver, type ResolverArg, type Token } from "./resolver";

export type LineMode = "single" | "multi";
export type OverflowMode = "normal" | "ellipsis" | "scrollX" | "clip";

export type LineModeProp = { $lineMode?: LineMode };
export type OverflowModeProp = { $overflowMode?: OverflowMode };

export type LineModeToken = Token<LineMode>;
export type OverflowModeToken = Token<OverflowMode>;

export const lineModeToken: LineModeToken = {
	multi: {},
	single: {},
};

export const overflowModeToken: OverflowModeToken = {
	normal: {},
	ellipsis: {},
	scrollX: {},
	clip: {},
};

/**
 * propsの値に対応するcss propertiesを返す関数群
 * NOTE: ここで指定している初期値はprop基準の初期値
 */

export const resolveLineMode = (arg: ResolverArg<LineMode>) => {
	const { value, token } = arg;
	return valueResolver(value, token, "multi");
};

export const resolveOverflowMode = (arg: ResolverArg<OverflowMode>) => {
	const { value, token } = arg;
	return valueResolver(value, token, "normal");
};

/**
 * NOTE: text関連のpropsはあらゆるコンポーネントで提供したい可能性があるため下記の処理を提供する部品を実装
 *       - props名
 *       - props値の解決
 *       - css propertiesの解決
 * NOTE: 各propsのtokenをベースにしているため外部から渡す必要がないように実装
 * NOTE: i/fの形式を統一するために引数はオブジェクト型にしています。
 */

export const cssLineMode = (args?: {
	defaultValue?: LineMode;
}) => css<LineModeProp>`
  ${({ $lineMode }) =>
		css(
			resolveLineMode({
				value: $lineMode ?? args?.defaultValue,
				token: lineModeToken,
			}),
		)}
`;

export const cssOverflowMode = (args?: {
	defaultValue?: OverflowMode;
}) => css<OverflowModeProp>`
  ${({ $overflowMode }) =>
		css(
			resolveOverflowMode({
				value: $overflowMode ?? args?.defaultValue,
				token: overflowModeToken,
			}),
		)}
`;
