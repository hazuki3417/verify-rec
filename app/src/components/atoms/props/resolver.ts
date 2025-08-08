import type { Styles } from "styled-components/dist/types";

export type Token<K extends string> = Record<K, Styles<object>>;

export interface ResolverArg<U extends string> {
	value: U | undefined;
	token: Token<U>;
}

export const resolver = <K extends string, T extends Token<K>>(
	value: K | undefined,
	token: T,
	defaultValue: K,
): Styles<object> => {
	// NOTE: styledのcssはここで利用しない（結合度があがリ、汎用性が下がるため）
	return token[value ?? defaultValue];
};
