import { css } from "styled-components";
import type { Error } from "./error";
import {
  styleResolver,
  type BooleanMap,
  type ResolverStyleMapArg,
  type StyledProps,
  type StyleMap,
} from "./resolver";
import { transform } from "./transform";
import { theme } from "@/theme";

export type InputVariant = "outline" | "filled";
export type InputError = Error;

export type InputVariantProp = { variant?: InputVariant };
export type InputErrorProp = { error?: InputError };

export interface InputStyleProps extends InputVariantProp, InputErrorProp {}

export type InputVariantStyleMap = StyleMap<InputVariant>;
export type InputErrorStyleMap = StyleMap<BooleanMap<InputError>>;

/**
 * themeからコンポーネント内で利用するtokenを作成
 */

export const inputVariantStyleMap: InputVariantStyleMap = {
  outline: {
    border: `1px solid ${theme.color.sub.gray}`,
    padding: "8px",
    "&:hover": {
      border: `1px solid ${theme.color.base.riverBlue}`,
      outline: `1px solid ${theme.color.base.riverBlue}`,
    },
    "&:focus": {
      border: `1px solid ${theme.color.main.emerald}`,
      outline: `1px solid ${theme.color.main.emerald}`,
    },
    "&:focus-visible": {
      border: `1px solid ${theme.color.main.emerald}`,
      outline: `1px solid ${theme.color.main.emerald}`,
    },
    // "&:read-only": {
    //   color: theme.color.sub.lightGray, // TODO: 確認。developの実装から持ってきたもの。disabledと見た目がかぶるため差異がわからない
    // },
    "&:disabled": {
      backgroundColor: theme.color.sub.lightGray,
      cursor: "not-allowed",
    },
    "&:disabled:hover,&:disabled:focus,&:disabled:focus-visible": {
      border: `1px solid ${theme.color.sub.gray}`,
      outline: `1px solid transparent`,
    },
  },
  filled: {
    border: "1px solid transparent",
    padding: "0px",
    "&:hover": {
      backgroundColor: theme.color.base.pealGray,
      border: `1px solid transparent`,
      outline: `1px solid transparent`,
    },
    "&:focus": {
      border: `1px solid transparent`,
      outline: `1px solid transparent`,
    },
    "&:focus-visible": {
      border: `1px solid transparent`,
      outline: `1px solid transparent`,
    },
    // "&:read-only": {
    //   color: theme.color.sub.lightGray, // TODO: 確認。developの実装から持ってきたもの。disabledと見た目がかぶるため差異がわからない
    // },
    "&:disabled": {
      backgroundColor: theme.color.sub.lightGray,
      cursor: "not-allowed",
    },
    "&:disabled:hover,&:disabled:focus,&:disabled:focus-visible": {
      border: `1px solid ${theme.color.sub.gray}`,
      outline: `1px solid transparent`,
    },
  },
};

export const inputErrorStyleMap: InputErrorStyleMap = {
  true: {
    border: `1px solid ${theme.color.sub.coral}`,
    "&:hover": {
      backgroundColor: theme.color.base.white,
      border: `1px solid ${theme.color.sub.coral}`,
      outline: `1px solid ${theme.color.sub.coral}`,
    },
    "&:focus": {
      backgroundColor: theme.color.base.white,
      border: `1px solid ${theme.color.sub.coral}`,
      outline: `1px solid ${theme.color.sub.coral}`,
    },
    "&:focus-visible": {
      backgroundColor: theme.color.base.white,
      border: `1px solid ${theme.color.sub.coral}`,
      outline: `1px solid ${theme.color.sub.coral}`,
    },
  },
  false: {
    // NOTE: 装飾しないので指定なし
  },
};

/**
 * propsの値に対応するcss propertiesを返す関数群
 * NOTE: ここで指定している初期値はprop基準の初期値
 */

export const resolveInputVariant = (arg: ResolverStyleMapArg<InputVariant>) => {
  const { prop, style } = arg;
  return styleResolver(prop, style, "outline");
};

export const resolveInputError = (
  arg: ResolverStyleMapArg<BooleanMap<InputError>>,
) => {
  const { prop, style } = arg;
  return styleResolver(prop, style, "false");
};

/**
 * NOTE: input関連のpropsはあらゆるコンポーネントで提供したい可能性があるため下記の処理を提供する部品を実装
 *       - props名
 *       - props値の解決
 *       - css propertiesの解決
 * NOTE: 各propsのtokenをベースにしているため外部から渡す必要がないように実装
 * NOTE: i/fの形式を統一するために引数はオブジェクト型にしています。
 */

export const cssInputVariant = () => css<StyledProps<InputVariantProp>>`
  ${({ $variant }) =>
    css(
      resolveInputVariant({
        prop: $variant,
        style: inputVariantStyleMap,
      }),
    )}
`;

export const cssInputError = () => css<StyledProps<InputErrorProp>>`
  ${({ $error }) =>
    css(
      resolveInputError({
        prop:
          typeof $error === "boolean"
            ? transform.bool.toString($error)
            : undefined,
        style: inputErrorStyleMap,
      }),
    )}
`;
