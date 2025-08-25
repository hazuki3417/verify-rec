import type { Styles } from "styled-components/dist/types";

export type Token<K extends string> = Record<K, Styles<object>>;

export interface ResolverArg<U extends string> {
	value: U | undefined;
	token: Token<U>;
}

export interface CSSResolverArg<T, U> {
	token: T;
	defaultValue?: U;
}

/*
 * propsの値に対応するcss propertiesを返す関数
 */
export const valueResolver = <K extends string, T extends Token<K>>(
	value: K | undefined,
	token: T,
	defaultValue: K,
): Styles<object> => {
	return token[value ?? defaultValue];
};
