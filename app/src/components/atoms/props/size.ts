import { css } from "styled-components";
import {
	valueResolver,
	type CSSResolverArg,
	type ResolverArg,
	type Token,
} from "./resolver";

export type Size = "xs" | "sm" | "md" | "lg";

export type SizeProp = {
	$size?: Size;
};

export type SizeToken = Token<Size>;

export const resolveSize = (arg: ResolverArg<Size>) => {
	const { value, token } = arg;
	return valueResolver(value, token, "md");
};

/*
 * NOTE: コンポーネントによってtokenのパターンが変わる可能性があるため外部注入できるように実装
 */
export const cssSize = (args: CSSResolverArg<SizeToken, Size>) => css<SizeProp>`
  ${({ $size }) =>
		css(
			resolveSize({
				value: $size ?? args.defaultValue,
				token: args.token,
			}),
		)}
`;
