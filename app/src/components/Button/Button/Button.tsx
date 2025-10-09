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

type ButtonVariant = Variant;
type ButtonSize = Size;

type ButtonVariantProp = VariantProp;
type ButtonSizeProp = SizeProp;

type ButtonVariantStyleMap = VariantStyleMap;
type ButtonSizeStyleMap = SizeStyleMap;

export const buttonVariantStyleMap: ButtonVariantStyleMap = {
  primary: {
    backgroundColor: "#23b18f",
    border: "1px solid transparent",
    color: "#ffffff",
  },
  secondary: {
    backgroundColor: "#ffffff",
    border: "solid 1px #bac9ce",
    color: "#23b18f",
  },
  tertiary: {
    backgroundColor: "#ffffff",
    border: "solid 1px #bac9ce",
    color: "#50737e",
  },
  quaternary: {
    backgroundColor: "#f0f5f6",
    border: "1px solid transparent",
    color: "#23b18f",
  },
  quinary: {
    backgroundColor: "#f0f5f6",
    border: "1px solid transparent",
    color: "#50737e",
  },
};

export const buttonSizeStyleMap: ButtonSizeStyleMap = {
  xs: {
    height: "19px",
    fontSize: "12px",
  },
  sm: {
    height: "28px",
    fontSize: "14px",
  },
  md: {
    height: "42px",
    fontSize: "16px",
  },
  lg: {
    height: "48px",
    fontSize: "20px",
  },
};

interface StyleProps extends ButtonVariantProp, ButtonSizeProp {}

const Base = styled.button<StyledProps<StyleProps>>`
  border-radius: 8px;
  box-shadow: #263a4033 0px 2px 4px 0px;
  cursor: pointer;
  font-weight: ${theme.font.weight.regular};
  line-height: ${theme.font.lineHeight[160]};
  padding: 0px 8px;
  text-align: center;
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
