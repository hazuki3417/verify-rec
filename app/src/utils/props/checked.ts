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
 * チェック状態（on/off）を表現するprop
 */

export type Checked = boolean;

export type CheckedProp = { checked?: Checked };

export type CheckedStyleMap = StyleMap<BooleanMap<Checked>>;

export const resolveChecked = (
  arg: ResolverStyleMapArg<BooleanMap<Checked>>,
) => {
  const { prop, style } = arg;
  // NOTE: 第三引数は checked prop としての初期値
  return styleResolver(prop, style, "false");
};

export const cssChecked = (
  args: CSSResolverArg<CheckedStyleMap, Checked>,
) => css<StyledProps<CheckedProp>>`
  ${({ $checked }) => {
    // checked prop 指定なしの場合は引数側の初期値を使用する
    // （引数側の初期値 = コンポーネント固有の初期値）
    const prop = $checked ?? args.defaultValue;

    return css(
      resolveChecked({
        prop:
          typeof prop === "boolean"
            ? transform.bool.toBooleanString(prop)
            : undefined,
        style: args.style,
      }),
    );
  }}
`;
