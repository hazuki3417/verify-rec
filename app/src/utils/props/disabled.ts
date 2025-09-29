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

export type Disabled = boolean;

export type DisabledProp = { disabled?: Disabled };

export type DisabledStyleMap = StyleMap<BooleanMap<Disabled>>;

export const resolveDisabled = (
  arg: ResolverStyleMapArg<BooleanMap<Disabled>>,
) => {
  const { prop, style } = arg;
  // NOTE: 第三引数は disabled prop としての初期値
  return styleResolver(prop, style, "false");
};

export const cssDisabled = (
  args: CSSResolverArg<DisabledStyleMap, Disabled>,
) => css<StyledProps<DisabledProp>>`
  ${({ $disabled }) => {
    // disabled prop 指定なしの場合は引数側の初期値を使用する
    // （引数側の初期値 = コンポーネント固有の初期値）
    const prop = $disabled ?? args.defaultValue;

    return css(
      resolveDisabled({
        prop:
          typeof prop === "boolean"
            ? transform.bool.toBooleanString(prop)
            : undefined,
        style: args.style,
      }),
    );
  }}
`;
