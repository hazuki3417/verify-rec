import { resolver, type Token } from "./resolver";

export type Variant =
	| "primary"
	| "secondary"
	| "tertiary"
	| "quaternary"
	| "quinary";

export type VariantProp = {
	variant?: Variant;
};

export type VariantToken = Token<Variant>;

export const resolveVariant = (
	value: Variant | undefined,
	token: VariantToken,
) => {
	// NOTE: styledのcssはここで利用しない（結合度があがリ、汎用性が下がるため）
	return resolver(value, token, "primary");
};
