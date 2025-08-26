import { css } from "styled-components";
import {
	styleResolver,
	type CSSResolverArg,
	type ResolverStyleMapArg,
	type StyleMap,
} from "./resolver";

export type Variant =
	| "primary"
	| "secondary"
	| "tertiary"
	| "quaternary"
	| "quinary";

export type VariantProp = {
	$variant?: Variant;
};

export type VariantStyleMap = StyleMap<Variant>;

export const resolveVariant = (args: ResolverStyleMapArg<Variant>) => {
	const { prop, style } = args;
	return styleResolver(prop, style, "primary");
};

/*
 * NOTE: コンポーネントによってtokenのパターンが変わる可能性があるため外部注入できるように実装
 */
export const cssVariant = (
	args: CSSResolverArg<VariantStyleMap, Variant>,
) => css<VariantProp>`
  ${({ $variant }) =>
		css(
			resolveVariant({
				prop: $variant ?? args.defaultValue,
				style: args.style,
			}),
		)}
`;
