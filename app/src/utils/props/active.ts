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

export type Active = boolean;

export type ActiveProp = { active?: Active };

export type ActiveStyleMap = StyleMap<BooleanMap<Active>>;

export const resolveActive = (arg: ResolverStyleMapArg<BooleanMap<Active>>) => {
  const { prop, style } = arg;
  // NOTE: 第三引数は active prop としての初期値
  return styleResolver(prop, style, "false");
};

export const cssActive = (args: CSSResolverArg<ActiveStyleMap, Active>) => css<
  StyledProps<ActiveProp>
>`
  ${({ $active }) => {
    // active prop 指定なしの場合は引数側の初期値を使用する
    // （引数側の初期値 = コンポーネント固有の初期値）
    const prop = $active ?? args.defaultValue;

    return css(
      resolveActive({
        prop:
          typeof prop === "boolean"
            ? transform.bool.toBooleanString(prop)
            : undefined,
        style: args.style,
      }),
    );
  }}
`;
