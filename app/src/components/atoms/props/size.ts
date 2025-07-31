import { resolver, type Token } from "./resolver";

export type Size = "xs" | "sm" | "md" | "lg";

export type SizeProp = {
	size?: Size;
};

export type SizeToken = Token<Size>;

export const resolveSize = (value: Size | undefined, token: SizeToken) => {
	// NOTE: styledのcssはここで利用しない（結合度があがリ、汎用性が下がるため）
	return resolver(value, token, "md");
};
