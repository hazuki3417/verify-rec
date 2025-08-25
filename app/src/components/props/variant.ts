import { css } from "styled-components";
import {
	valueResolver,
	type CSSResolverArg,
	type ResolverArg,
	type Token,
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

export type VariantToken = Token<Variant>;

export const resolveVariant = (args: ResolverArg<Variant>) => {
	const { value, token } = args;
	return valueResolver(value, token, "primary");
};

/*
 * NOTE: コンポーネントによってtokenのパターンが変わる可能性があるため外部注入できるように実装
 */
export const cssVariant = (
	args: CSSResolverArg<VariantToken, Variant>,
) => css<VariantProp>`
  ${({ $variant }) =>
		css(
			resolveVariant({
				value: $variant ?? args.defaultValue,
				token: args.token,
			}),
		)}
`;
