import React, { forwardRef } from "react";
import styled from "styled-components";
import { type StyledProps } from "@/utils/props";

interface StyleProps {}

const Base = styled.option<StyledProps<StyleProps>>`
`;

type BaseProps = React.ComponentPropsWithoutRef<"option">;

export interface InputSelectOptionProps extends StyleProps, BaseProps {}

export const InputSelectOption = forwardRef<
  HTMLOptionElement,
  InputSelectOptionProps
>((props, ref) => {
  const { ...rest } = props;
  return <Base ref={ref} {...rest} />;
});
