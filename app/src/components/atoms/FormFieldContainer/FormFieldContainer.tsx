import React, { forwardRef } from "react";
import styled from "styled-components";
import { resolveStyle, type StylableProp } from "../props";
import { FormLabel } from "./../FormLabel";
import { FormDescription } from "./../FormDescription";
import { FormFieldMessage } from "../FormFieldMessage";

type BaseProps = React.HTMLAttributes<HTMLDivElement>;

const Base = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #d4f1ea;
	border-radius: 8px;
	margin: 0px;
	padding: 8px;
	gap: 4px
`;

interface StyleProps extends StylableProp {}

export interface FormFieldContainerProps
	extends StyleProps,
		Omit<BaseProps, "style"> {
	label?: React.ReactNode;
	description?: React.ReactNode;
	message?: React.ReactNode;
	children?: React.ReactNode;
}

export const FormFieldContainer = forwardRef<
	HTMLDivElement,
	FormFieldContainerProps
>((props, ref) => {
	const { style, label, description, message, children, ...rest } = props;
	return (
		<Base ref={ref} style={resolveStyle(style)} {...rest}>
			{label && typeof label === "string" ? (
				<FormLabel>{label}</FormLabel>
			) : (
				label
			)}
			{children}
			{description && typeof description === "string" ? (
				<FormDescription>{description}</FormDescription>
			) : (
				description
			)}
			{message && typeof message === "string" ? (
				<FormFieldMessage>{message}</FormFieldMessage>
			) : (
				message
			)}
		</Base>
	);
});
