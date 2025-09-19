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
  props: {
    toStyled: txStyledProps,
  },
};
