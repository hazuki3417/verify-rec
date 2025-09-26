import React from "react";
import { Container, type ContainerProps } from "./Container";

export interface TooltipContainerProps extends ContainerProps {}

/**
 * portalとtooltop contentの間に配置するコンテナーコンポーネント
 * @returns
 */
export const TooltipContainer = (props: TooltipContainerProps) => {
  const { style, ...rest } = props;
  return (
    <Container
      style={{
        ...style,
        /**
         * NOTE: ここに各Floating UIの差異styleを記述する。
         *       ただしデザインの装飾は含めないこと。
         */
        zIndex: 4000,
      }}
      {...rest}
    />
  );
};
