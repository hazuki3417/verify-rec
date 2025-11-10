import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import {
  cssInputError,
  cssInputVariant,
  styleResolver,
  transform,
  type BooleanMap,
  type InputStyleProps,
  type ResolverStyleMapArg,
  type StyledProps,
  type StyleMap,
} from "@/utils/props";
import { theme } from "@/theme";

export type InputTextareaResize = boolean;

export type InputTextareaResizeProp = { resize?: InputTextareaResize };

export type InputTextareaResizeStyleMap = StyleMap<
  BooleanMap<InputTextareaResize>
>;

export const inputTextareaResizeStyleMap: InputTextareaResizeStyleMap = {
  true: {
    // 指定なし
  },
  false: {
    resize: "none",
  },
};

const resolveResize = (
  arg: ResolverStyleMapArg<BooleanMap<InputTextareaResize>>,
) => {
  const { prop, style } = arg;
  return styleResolver(prop, style, "true");
};

interface StyleProps extends InputStyleProps, InputTextareaResizeProp {}

const Base = styled.textarea<StyledProps<StyleProps>>`
  background-color: ${theme.color.base.white};
  border-radius: 4px;
  font-family: ${theme.font.family.base};
  font-size: ${theme.font.size[16]};
  font-weight: ${theme.font.weight.regular};
  color: ${theme.color.base.riverBlue};
  line-height: ${theme.font.lineHeight[160]};
  &::placeholder {
    color: ${theme.color.sub.lightGray};
  }
  ${cssInputVariant}
  ${cssInputError}
  ${({ $resize }) => {
    return css(
      resolveResize({
        prop:
          typeof $resize === "boolean"
            ? transform.bool.toBooleanString($resize)
            : undefined,
        style: inputTextareaResizeStyleMap,
      }),
    );
  }}
`;

type BaseProps = React.InputHTMLAttributes<HTMLTextAreaElement>;

export interface InputTextareaProps
  extends StyleProps,
    Omit<BaseProps, "style" | "type"> {}

export const InputTextarea = forwardRef<
  HTMLTextAreaElement,
  InputTextareaProps
>((props, ref) => {
  const { variant, error, resize, ...rest } = props;

  const styled = transform.props.toStyled({
    variant,
    error,
    resize,
  });
  return <Base ref={ref} {...styled} {...rest} />;
});
