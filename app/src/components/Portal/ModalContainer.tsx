import React from "react";
import { Container, type ContainerProps } from "./Container";

export interface ModalContainerProps extends ContainerProps {}

/**
 * portalとmodal contentの間に配置するコンテナーコンポーネント
 * @returns
 */
export const ModalContainer = (props: ModalContainerProps) => {
  const { style, ...rest } = props;
  return (
    <Container
      style={{
        ...style,
        /**
         * NOTE: ここに各Floating UIの差異styleを記述する。
         *       ただしデザインの装飾は含めないこと。
         */
        zIndex: 3000,
      }}
      {...rest}
    />
  );
};
