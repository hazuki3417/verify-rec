import React, { forwardRef } from "react";
import styled from "styled-components";
import {
  type FontStyleProps,
  type TextStyleProps,
  cssFontColor,
  cssFontSize,
  cssFontLineHeight,
  cssFontWeight,
  cssTextLineMode,
  cssTextOverflowMode,
  type StyledProps,
  transform,
} from "../../props";
import { theme } from "@/theme";

type BaseProps = React.ComponentPropsWithoutRef<"p">;

interface StyleProps extends FontStyleProps, TextStyleProps {}

const Base = styled.p<StyledProps<StyleProps>>`
  font-family: ${theme.font.family.base};
  margin: 0px;
  padding: 0px;
  ${cssFontColor()}
  ${cssFontSize()}
  ${cssFontLineHeight()}
  ${cssFontWeight()}
  ${cssTextLineMode()}
  ${cssTextOverflowMode()}
`;

export interface TextProps extends StyleProps, BaseProps {}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (props, ref) => {
    const {
      style,
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
  },
);
