import React, { forwardRef } from "react";
import styled from "styled-components";
import {
  type SizeProp,
  type VariantProp,
  type VariantStyleMap,
  type SizeStyleMap,
  cssVariant,
  cssSize,
  type StyledProps,
  transform,
  type Variant,
  type Size,
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

interface StyleProps extends ButtonVariantProp, ButtonSizeProp {}

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
`;

type BaseProps = React.ComponentPropsWithoutRef<"button">;

export interface ButtonProps extends StyleProps, BaseProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { variant, size, ...rest } = props;

    const styled = transform.props.toStyled({
      variant,
      size,
    });

    return <Base ref={ref} {...styled} {...rest} />;
  },
);
