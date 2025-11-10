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
import { InputSelectOption } from "./InputSelectOption";

interface StyleProps extends InputStyleProps {}

const Base = styled.select<StyledProps<StyleProps>>`
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

type BaseProps = React.InputHTMLAttributes<HTMLSelectElement>;

export interface InputSelectProps
  extends StyleProps,
    Omit<BaseProps, "style"> {}

type InputSelectComponent = React.ForwardRefExoticComponent<
  InputSelectProps & React.RefAttributes<HTMLSelectElement>
> & {
  Option: typeof InputSelectOption;
};

/**
 * @example
 * ```
 * <InputSelect>
 *   <InputSelect.Option value="1">vprimary</InputSelect.Option>
 *   <InputSelect.Option value="2">secondary</InputSelect.Option>
 *   <InputSelect.Option value="3">tertiary</InputSelect.Option>
 * </InputSelect>
 * ```
 */
export const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(
  (props, ref) => {
    const { variant, error, ...rest } = props;

    const styled = transform.props.toStyled({
      variant,
      error,
    });
    return <Base ref={ref} {...styled} {...rest} />;
  },
) as InputSelectComponent;

InputSelect.Option = InputSelectOption;
