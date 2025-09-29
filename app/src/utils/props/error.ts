import { css } from "styled-components";
import {
  styleResolver,
  type BooleanMap,
  type CSSResolverArg,
  type ResolverStyleMapArg,
  type StyledProps,
  type StyleMap,
} from "./resolver";
import { transform } from "./transform";

/**
 * 選択状態・アクティブ状態などを表現するprop
 */

export type Error = boolean;

export type ErrorProp = { error?: Error };

export type ErrorStyleMap = StyleMap<BooleanMap<Error>>;

export const resolveError = (arg: ResolverStyleMapArg<BooleanMap<Error>>) => {
  const { prop, style } = arg;
  // NOTE: 第三引数は error prop としての初期値
  return styleResolver(prop, style, "false");
};

export const cssError = (args: CSSResolverArg<ErrorStyleMap, Error>) => css<
  StyledProps<ErrorProp>
>`
  ${({ $error }) => {
    // error prop 指定なしの場合は引数側の初期値を使用する
    // （引数側の初期値 = コンポーネント固有の初期値）
    const prop = $error ?? args.defaultValue;

    return css(
      resolveError({
        prop:
          typeof prop === "boolean"
            ? transform.bool.toBooleanString(prop)
            : undefined,
        style: args.style,
      }),
    );
  }}
`;
