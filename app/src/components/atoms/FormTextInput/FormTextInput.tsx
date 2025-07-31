import React, { forwardRef } from "react";
import styled from "styled-components";
import { resolveStyle, type StylableProp } from "../props";

type BaseProps = React.InputHTMLAttributes<HTMLInputElement>;

const Base = styled.input`
	background-color: #ffffff;
	border-radius: 4px;
	border: 1px solid #50737e;
	font-size: 16px;
	line-height: 160%;
	padding: 8px;
	&:read-only {
		color: #bac9ce;
	}
`;

interface StyleProps extends StylableProp {}

export interface FormTextInputProps
	extends StyleProps,
		Omit<BaseProps, "style" | "type"> {}

export const FormTextInput = forwardRef<HTMLInputElement, FormTextInputProps>(
	(props, ref) => {
		const { style, ...rest } = props;
		return <Base ref={ref} style={resolveStyle(style)} type="text" {...rest} />;
	},
);
