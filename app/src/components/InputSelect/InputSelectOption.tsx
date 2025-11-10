import React, { forwardRef } from "react";
import styled from "styled-components";
import { type StyledProps } from "@/utils/props";

interface StyleProps { }

const Base = styled.option<StyledProps<StyleProps>>`
`;

type BaseProps = React.ComponentPropsWithoutRef<"option">;

export interface InputSelectOptionProps extends StyleProps, BaseProps { }

export const InputSelectOption = forwardRef<
  HTMLOptionElement,
  InputSelectOptionProps
>((props, ref) => {
  const { ...rest } = props;

  /**
   * NOTE: 現状の実装では装飾なしで実装
   *       optionに対する装飾が必要になったときは随時拡張する
   */

  return <Base ref={ref} {...rest} />;
});
