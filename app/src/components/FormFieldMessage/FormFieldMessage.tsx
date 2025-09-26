import React, { forwardRef } from "react";
import styled from "styled-components";

type BaseProps = React.HTMLAttributes<HTMLParagraphElement>;

const Base = styled.p`
  color: #ff5252;
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
  margin: 0px;
  padding: 0px;
  word-brak: break-all;
`;

interface StyleProps {
  // TODO: error, warningのvariantを実装
}

export interface FormFieldMessageProps extends StyleProps, BaseProps {
  // TODO: 改行有無を選択可能に
  // TODO: オーバーフロー時のscroll有無を選択可能に（hidden or scroll x or scroll y
  // TODO: オーバーフロー時の文字省略有無を選択可能に
}

export const FormFieldMessage = forwardRef<
  HTMLParagraphElement,
  FormFieldMessageProps
>((props, ref) => {
  const { ...rest } = props;
  return <Base ref={ref} {...rest} />;
});
