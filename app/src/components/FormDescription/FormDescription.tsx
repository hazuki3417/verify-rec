import React, { forwardRef } from "react";
import styled from "styled-components";

type BaseProps = React.HTMLAttributes<HTMLParagraphElement>;

const Base = styled.p`
  color: #50737e;
  font-size: 12px;
  font-weight: 400;
  line-height: 160%;
  margin: 0px;
  padding: 0px;
  word-brak: break-all;
`;

interface StyleProps {}

export interface FormDescriptionProps extends StyleProps, BaseProps {
  // TODO: 改行有無を選択可能に
  // TODO: オーバーフロー時のscroll有無を選択可能に（hidden or scroll x or scroll y
  // TODO: オーバーフロー時の文字省略有無を選択可能に
}

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>((props, ref) => {
  const { ...rest } = props;
  return <Base ref={ref} {...rest} />;
});
