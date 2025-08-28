import React, { forwardRef } from "react";
import styled from "styled-components";
import { resolveStyle, type StylableProp } from "../props";

type BaseProps = React.HTMLAttributes<HTMLDivElement>;

const Base = styled.div`
	color: #50737e;
	font-size: 16px;
	line-height: 160%;
	padding: 0px 8px;
	white-space: pre-wrap;
	word-brak: break-all;
	word-wrap: break-word;
`;

interface StyleProps extends StylableProp {
  // TODO: 改行有無を選択可能に
  // TODO: オーバーフロー時のscroll有無を選択可能に（hidden or scroll x or scroll y
  // TODO: オーバーフロー時の文字省略有無を選択可能に
}

export interface FormTextValueProps
  extends StyleProps,
    Omit<BaseProps, "style"> {}

export const FormTextValue = forwardRef<HTMLDivElement, FormTextValueProps>(
  (props, ref) => {
    const { style, ...rest } = props;
    return <Base ref={ref} style={resolveStyle(style)} {...rest} />;
  },
);
