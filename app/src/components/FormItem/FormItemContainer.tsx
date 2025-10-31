import React, { forwardRef } from "react";
import {
  type FontStyleProps,
  type StyledProps,
  type TextStyleProps,
} from "@/utils/props";
import styled from "styled-components";

type BaseProps = React.ComponentPropsWithoutRef<"div">;

interface StyleProps extends FontStyleProps, TextStyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
`;

export interface FormItemContainerProps extends StyleProps, BaseProps {}

export const FormItemContainer = forwardRef<
  HTMLDivElement,
  FormItemContainerProps
>((props, ref) => {
  const { ...rest } = props;

  return <Base ref={ref} {...rest} />;
});
