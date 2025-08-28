import React, { forwardRef } from "react";
import styled from "styled-components";
import {
  resolveStyle,
  type StylableProp,
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
} from "../props";

type BaseProps = React.ComponentPropsWithoutRef<"p">;

interface StyleProps extends StylableProp, FontStyleProps, TextStyleProps {}

const Base = styled.p<StyledProps<StyleProps>>`
	padding: 0px;
	margin: 0px;
	${cssFontColor()}
	${cssFontSize()}
	${cssFontLineHeight()}
	${cssFontWeight()}
	${cssTextLineMode()}
	${cssTextOverflowMode()}
`;

export interface TextProps extends StyleProps, Omit<BaseProps, "style"> {}

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

    return <Base ref={ref} style={resolveStyle(style)} {...styled} {...rest} />;
  },
);
