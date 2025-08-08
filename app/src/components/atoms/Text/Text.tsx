import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import { resolveStyle, type StylableProp } from "../props";
import {
	resolveFontColor,
	resolveFontLineHeight,
	resolveFontSize,
	resolveFontWeight,
	fontColorToken,
	fontLineHeightToken,
	fontSizeToken,
	fontWeightToken,
	type FontProp,
} from "../props/font";

type BaseProps = React.ComponentPropsWithoutRef<"p">;

interface StyleProps extends StylableProp, FontProp {}

const Base = styled.p<StyleProps>`
	padding: 0px;
	margin: 0px;

	${({ fontColor }) => {
		return css(
			resolveFontColor({
				value: fontColor,
				token: fontColorToken,
			}),
		);
	}}
	${({ fontSize }) => {
		return css(
			resolveFontSize({
				value: fontSize,
				token: fontSizeToken,
			}),
		);
	}}
	${({ fontLineHeight }) => {
		return css(
			resolveFontLineHeight({
				value: fontLineHeight,
				token: fontLineHeightToken,
			}),
		);
	}}
	${({ fontWeight }) => {
		return css(
			resolveFontWeight({
				value: fontWeight,
				token: fontWeightToken,
			}),
		);
	}}
`;

export interface TextProps extends StyleProps, Omit<BaseProps, "style"> {}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
	(props, ref) => {
		const { style, ...rest } = props;
		return <Base ref={ref} style={resolveStyle(style)} {...rest} />;
	},
);
