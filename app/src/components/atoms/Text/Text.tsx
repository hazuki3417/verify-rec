import React, { forwardRef } from "react";
import styled from "styled-components";
import { resolveStyle, type StylableProp } from "../props";
import {
	type FontProps,
	cssFontColor,
	cssFontSize,
	cssFontLineHeight,
	cssFontWeight,
} from "../props";

type BaseProps = React.ComponentPropsWithoutRef<"p">;

interface StyleProps extends StylableProp, FontProps {}

const Base = styled.p<StyleProps>`
	padding: 0px;
	margin: 0px;
	${cssFontColor()}
	${cssFontSize()}
	${cssFontLineHeight()}
	${cssFontWeight()}
`;

export interface TextProps extends StyleProps, Omit<BaseProps, "style"> {}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
	(props, ref) => {
		const { style, ...rest } = props;
		return <Base ref={ref} style={resolveStyle(style)} {...rest} />;
	},
);
