import type { CSSObject } from "styled-components";

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
export type StyleMap<K extends string> = Record<K, CSSObject>;

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
): CSSObject => {
  const prop = value ?? defaultValue;
  const style = map[prop];
  if (style === undefined) {
    throw new Error(`Unexpected prop value "${String(prop)}"`);
  }
  return style;
};

/*
 * propの値に対応するcss propertyの値を返す関数
 */
export const valueResolver = <K extends string, T extends ValueMap<K>>(
  value: K | undefined,
  map: T,
  defaultValue: K,
): string => {
  const prop = value ?? defaultValue;
  const style = map[prop];
  if (style === undefined) {
    throw new Error(`Unexpected prop value "${String(prop)}"`);
  }
  return style;
};
