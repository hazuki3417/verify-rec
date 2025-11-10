import React, { type HTMLAttributes } from "react";
import { useInputFileContext } from "./InputFile.context";
import styled from "styled-components";
import type { StyledProps } from "@/utils/props";

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
  cursor: pointer;
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface InputFileResetButtonContainer
  extends Omit<BaseProps, "onClick" | "children"> {
  children:
    | React.ReactNode
    | ((props: HTMLAttributes<HTMLButtonElement>) => React.ReactNode);
}

export const InputFileResetButtonContainer = (
  props: InputFileResetButtonContainer,
) => {
  const { children, ...rest } = props;
  const context = useInputFileContext();

  const buttonAttrubutes = {
    disabled: context.value.disabled,
    onClick: context.handler.onFileReset,
  };

  /**
   * NOTE: イベントのバブリングを利用した実装。
   *       デザインだけを持ったコンポーネントを子要素に配置するだけでも選択済みのファイルをリセットできます。
   *       childrenから関数を受け取った場合は、buttonAttrubutesを渡して子要素で利用できるように実装しています。
   *       例）親要素で指定したdisabledやmultipleの属性を子要素に継承して状態を連動したい
   */

  return (
    <Base {...rest} role="button" onClick={context.handler.onFileReset}>
      {typeof children === "function" ? children(buttonAttrubutes) : children}
    </Base>
  );
};
