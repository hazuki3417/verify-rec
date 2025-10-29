import React from "react";
import { useInputFileContext } from "./InputFile.context";
import styled from "styled-components";
import type { StyledProps } from "@/utils/props";

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
  cursor: pointer;
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface InputFileButtonContainer extends Omit<BaseProps, "onClick"> {}

export const InputFileButtonContainer = (props: InputFileButtonContainer) => {
  const { ...rest } = props;
  const context = useInputFileContext();
  // NOTE: 子要素側でstopPropagation()を利用すると下記のイベントが発火しないので注意
  //       イベントのバブリングを利用した実装。デザインだけを持ったコンポーネントを子要素に配置するだけでよい。
  return (
    <Base {...rest} role="button" onClick={context.handler.onFileSelect} />
  );
};
