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
} from "../props";

type BaseProps = React.ComponentPropsWithoutRef<"p">;

interface StyleProps extends StylableProp, FontStyleProps, TextStyleProps {}

const Base = styled.p<StyleProps>`
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
		const { style, ...rest } = props;
		return <Base ref={ref} style={resolveStyle(style)} {...rest} />;
	},
);
