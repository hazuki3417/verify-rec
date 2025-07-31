import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import {
	resolveStyle,
	resolveVariant,
	resolveSize,
	type SizeProp,
	type StylableProp,
	type VariantProp,
	type VariantToken,
	type SizeToken,
} from "../props";

type BaseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantToken: VariantToken = {
	primary: {
		backgroundColor: "#23b18f",
		border: "1px solid transparent",
		color: "#ffffff",
	},
	secondary: {
		backgroundColor: "#ffffff",
		border: "solid 1px #bac9ce",
		color: "#23b18f",
	},
	tertiary: {
		backgroundColor: "#ffffff",
		border: "solid 1px #bac9ce",
		color: "#50737e",
	},
	quaternary: {
		backgroundColor: "#f0f5f6",
		border: "1px solid transparent",
		color: "#23b18f",
	},
	quinary: {
		backgroundColor: "#f0f5f6",
		border: "1px solid transparent",
		color: "#50737e",
	},
};

const sizeToken: SizeToken = {
	xs: {
		height: "19px",
		fontSize: "12px",
	},
	sm: {
		height: "28px",
		fontSize: "14px",
	},
	md: {
		height: "42px",
		fontSize: "16px",
	},
	lg: {
		height: "48px",
		fontSize: "20px",
	},
};

interface StyleProps extends StylableProp, VariantProp, SizeProp {}

const Base = styled.button<StyleProps>`
	border-radius: 8px;
	cursor: pointer;
	font-weight: 700;
	line-height: 160%;
	padding: 0px 8px;
	text-align: center;
	box-shadow: #263a4033 0px 2px 4px 0px;
	${({ variant }) => {
		return css(resolveVariant(variant, variantToken));
	}}
	${({ size }) => {
		return css(resolveSize(size, sizeToken));
	}}
`;

export interface ButtonProps extends StyleProps, Omit<BaseProps, "style"> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		const { style, ...rest } = props;
		return <Base ref={ref} style={resolveStyle(style)} {...rest} />;
	},
);
