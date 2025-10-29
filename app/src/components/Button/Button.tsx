import React, { forwardRef, useMemo, type CSSProperties } from "react";
import styled from "styled-components";
import {
  resolveVariant,
  resolveSize,
  resolveDisabled,
  cssDisabled,
  cssSize,
  cssVariant,
  transform,
  type DisabledProp,
  type DisabledStyleMap,
  type Size,
  type SizeProp,
  type SizeStyleMap,
  type StyledProps,
  type Variant,
  type VariantProp,
  type VariantStyleMap,
} from "@/utils/props";
import { theme } from "@/theme";

export type ButtonVariant = Variant;
export type ButtonSize = Size;

export type ButtonVariantProp = VariantProp;
export type ButtonSizeProp = SizeProp;

export type ButtonVariantStyleMap = VariantStyleMap;
export type ButtonSizeStyleMap = SizeStyleMap;

export const buttonVariantStyleMap: ButtonVariantStyleMap = {
  primary: {
    backgroundColor: theme.color.main.emerald,
    border: `1px solid transparent`,
    color: theme.color.base.white,
  },
  secondary: {
    backgroundColor: theme.color.base.white,
    border: `solid 1px ${theme.color.sub.lightGray}`,
    color: theme.color.main.emerald,
  },
  tertiary: {
    backgroundColor: theme.color.base.white,
    border: `solid 1px ${theme.color.sub.lightGray}`,
    color: theme.color.base.riverBlue,
  },
  quaternary: {
    backgroundColor: theme.color.base.pealGray,
    border: `1px solid transparent`,
    color: theme.color.main.emerald,
  },
  quinary: {
    backgroundColor: theme.color.base.pealGray,
    border: `1px solid transparent`,
    color: theme.color.base.riverBlue,
  },
};

export const buttonSizeStyleMap: ButtonSizeStyleMap = {
  xs: {
    height: "19px",
    fontSize: theme.font.size[12],
  },
  sm: {
    height: "28px",
    fontSize: theme.font.size[14],
  },
  md: {
    height: "42px",
    fontSize: theme.font.size[16],
  },
  lg: {
    height: "48px",
    fontSize: theme.font.size[20],
  },
};

export const buttonDisabledStyleMap: DisabledStyleMap = {
  true: {
    backgroundColor: theme.color.base.pealGray,
    border: "1px solid transparent",
    cursor: "not-allowed",
    color: theme.color.sub.gray,
  },
  false: {
    // とくに変化しないので指定なし
  },
};

interface StyleProps extends ButtonVariantProp, ButtonSizeProp, DisabledProp { }

const Base = styled.button<StyledProps<StyleProps>>`
  align-items: center;
  border-radius: 8px;
  box-shadow: #263a4033 0px 2px 4px 0px;
  cursor: pointer;
  display: inline-flex;
  font-weight: ${theme.font.weight.regular};
  justify-content: center;
  line-height: ${theme.font.lineHeight[160]};
  padding: 0px 8px;
  ${cssVariant({ style: buttonVariantStyleMap })}
  ${cssSize({ style: buttonSizeStyleMap })}
  ${cssDisabled({ style: buttonDisabledStyleMap })}

  ${({ $variant }) =>
    $variant === "primary" &&
    `&:hover {
      background-color: ${theme.color.sub.darkEmerald};
    }`}
  ${({ $variant }) =>
    $variant === "secondary" &&
    `&:hover {
      border-color: ${theme.color.base.riverBlue};
    }`}
  ${({ $variant }) =>
    $variant === "tertiary" &&
    `&:hover {
      border-color: ${theme.color.base.riverBlue};
    }`}
  ${({ $variant }) =>
    $variant === "quaternary" &&
    `&:hover {
      background-color: ${theme.color.sub.slightlyLightGray};
    }`}
  // NOTE: quinaryのhoverはfigmaに定義されていないので指定なし
`;

type BaseProps = React.ComponentPropsWithoutRef<"button">;

export interface ButtonProps extends StyleProps, Omit<BaseProps, "children"> {
  children: React.ReactNode | ((style: CSSProperties) => React.ReactNode);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { variant, size, disabled, children, ...rest } = props;

    const styled = transform.props.toStyled({
      variant,
      size,
      disabled,
    });

    const style: CSSProperties = useMemo(() => {
      /**
       * NOTE: props で指定されたスタイルからcss styleを算出・マージする。その後子要素に渡したいcss propertiyを算出
       *       variantやdisabledで指定されたstyleを子要素でも利用したいケースに対応するための実装
       */
      const style = {
        ...resolveVariant({ prop: variant, style: buttonVariantStyleMap }),
        ...resolveSize({ prop: size, style: buttonSizeStyleMap }),
        ...resolveDisabled({
          prop: transform.bool.toBooleanString(disabled ?? false),
          style: buttonDisabledStyleMap,
        }),
      };
      return {
        ...transform.object.pick(style, ["color"]),
      };
    }, [variant, size, disabled]);

    return (
      <Base ref={ref} {...styled} {...rest}>
        {typeof children === "function" ? children(style) : children}
      </Base>
    );
  },
);
