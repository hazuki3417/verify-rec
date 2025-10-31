import { theme } from "@/theme";
import {
  cssFontColor,
  cssFontLineHeight,
  cssFontSize,
  cssFontWeight,
  cssTextLineMode,
  cssTextOverflowMode,
  transform,
  type FontStyleProps,
  type StyledProps,
  type TextStyleProps,
} from "@/utils/props";
import React, { forwardRef } from "react";
import styled from "styled-components";

type BaseProps = React.ComponentPropsWithoutRef<"p">;

interface StyleProps extends FontStyleProps, TextStyleProps {}

const Base = styled.p<StyledProps<StyleProps>>`
  font-family: ${theme.font.family.base};
  margin: 0px;
  padding: 0px;
  ${cssFontColor({ defaultValue: "coral" })}
  ${cssFontSize({ defaultValue: "14" })}
  ${cssFontLineHeight({ defaultValue: "160" })}
  ${cssFontWeight({ defaultValue: "regular" })}
  ${cssTextLineMode({ defaultValue: "multi" })}
  ${cssTextOverflowMode({ defaultValue: "normal" })}
`;

export interface FormItemMessageProps extends StyleProps, BaseProps {}

export const FormItemMessage = forwardRef<
  HTMLParagraphElement,
  FormItemMessageProps
>((props, ref) => {
  const {
    fontColor,
    fontSize,
    fontLineHeight,
    fontWeight,
    lineMode,
    overflowMode,
    ...rest
  } = props;

  // key: value -> $key: value に変換($をkey名の先頭に付与)
  const styled = transform.props.toStyled({
    fontColor,
    fontSize,
    fontLineHeight,
    fontWeight,
    lineMode,
    overflowMode,
  });

  return <Base ref={ref} {...styled} {...rest} />;
});
