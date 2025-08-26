import type { Styles } from "styled-components/dist/types";

export interface CSSResolverArg<T, U> {
	style: T;
	defaultValue?: U;
}

export type StyleMap<K extends string> = Record<K, Styles<object>>;
export type ValueMap<K extends string> = Record<K, string>;

export interface ResolverStyleMapArg<U extends string> {
	prop: U | undefined;
	style: StyleMap<U>;
}

export interface ResolverValueMapArg<U extends string> {
	prop: U | undefined;
	value: ValueMap<U>;
}

/*
 * propの値に対応するcss styleを返す関数
 */
export const styleResolver = <K extends string, T extends StyleMap<K>>(
	value: K | undefined,
	map: T,
	defaultValue: K,
): Styles<object> => {
	return map[value ?? defaultValue];
};

/*
 * propの値に対応するcss styleを返す関数
 */
export const valueResolver = <K extends string, T extends ValueMap<K>>(
	value: K | undefined,
	map: T,
	defaultValue: K,
): string => {
	return map[value ?? defaultValue];
};
