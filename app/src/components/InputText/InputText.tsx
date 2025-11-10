import React, { forwardRef } from "react";
import styled from "styled-components";
import {
  cssInputError,
  cssInputVariant,
  transform,
  type InputStyleProps,
  type StyledProps,
} from "@/utils/props";
import { theme } from "@/theme";

type BaseProps = React.InputHTMLAttributes<HTMLInputElement>;

interface StyleProps extends InputStyleProps {}

const Base = styled.input<StyledProps<StyleProps>>`
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
`;

export interface InputTextProps
  extends StyleProps,
    Omit<BaseProps, "style" | "type"> {}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (props, ref) => {
    const { variant, error, ...rest } = props;

    const styled = transform.props.toStyled({
      variant,
      error,
    });
    // NOTE: type="text" に固定するため一番最後に指定（スプレッド演算子をあとに記述すると値が上書きされる）
    return <Base ref={ref} {...styled} {...rest} type="text" />;
  },
);
