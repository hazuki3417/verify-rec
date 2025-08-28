import type { Styles } from "styled-components/dist/types";

type PrefixKeys<T, P extends string> = {
	[K in keyof T as `${P}${Extract<K, string | number>}`]: T[K];
};
/**
 * NOTE: styled component用のutil
 *       prop名に$を付与する
 */
export type StyledProps<T> = PrefixKeys<T, "$">;
export interface CSSResolverArg<T, U> {
	style: T;
	defaultValue?: U;
}

export type BooleanMap<T> = T extends boolean ? "true" | "false" : T;

export type ValueMap<K extends string> = Record<K, string>;
export type StyleMap<K extends string> = Record<K, Styles<object>>;

export interface ResolverValueMapArg<U extends string> {
	prop: U | undefined;
	value: ValueMap<U>;
}

export interface ResolverStyleMapArg<U extends string> {
	prop: U | undefined;
	style: StyleMap<U>;
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
