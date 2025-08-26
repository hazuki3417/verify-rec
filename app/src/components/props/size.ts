import { css } from "styled-components";
import {
	styleResolver,
	type CSSResolverArg,
	type ResolverStyleMapArg,
	type StyleMap,
} from "./resolver";

export type Size = "xs" | "sm" | "md" | "lg";

export type SizeProp = {
	$size?: Size;
};

export type SizeStyleMap = StyleMap<Size>;

export const resolveSize = (arg: ResolverStyleMapArg<Size>) => {
	const { prop, style } = arg;
	return styleResolver(prop, style, "md");
};

/*
 * NOTE: コンポーネントによってtokenのパターンが変わる可能性があるため外部注入できるように実装
 */
export const cssSize = (
	args: CSSResolverArg<SizeStyleMap, Size>,
) => css<SizeProp>`
  ${({ $size }) =>
		css(
			resolveSize({
				prop: $size ?? args.defaultValue,
				style: args.style,
			}),
		)}
`;
