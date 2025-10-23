type StyledProps<T> = {
  [K in keyof T as K extends string | number ? `$${K}` : never]: T[K];
};

/**
 * key -> $key に変換します（styled-compoentsのprops形式に変換）
 * NOTE: 値が undefined のキーは出力しません。
 */
const txStyledProps = <T extends Record<string, unknown>>(
  props: T,
): StyledProps<T> => {
  const styledProps: Record<string, unknown> = {};
  for (const k in props) {
    const value = props[k];
    if (value !== undefined) styledProps[`$${k}`] = value;
  }
  return styledProps as StyledProps<T>;
};

/**
 * objectから指定したキーのkey,valueセットを抽出する関数
 * @param obj
 * @param keys
 * @returns
 */
const pickKeys = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
};

/**
 * objectから指定したキーのkey,valueセットを除外する関数
 * @param obj
 * @param keys
 * @returns
 */
const omitKeys = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      if (!keys.includes(key as K)) {
        (acc as any)[key] = obj[key as K];
      }
      return acc;
    },
    {} as Omit<T, K>,
  );
};

export const transform = {
  bool: {
    toBooleanString: (value: boolean): "true" | "false" => {
      return value ? "true" : "false";
    },
    toNumber: (value: boolean): 1 | 0 => {
      return value ? 1 : 0;
    },
    toNumberString: (value: boolean): "1" | "0" => {
      return value ? "1" : "0";
    },
  },
  object: {
    pick: pickKeys,
    omit: omitKeys,
  },
  props: {
    toStyled: txStyledProps,
  },
};
