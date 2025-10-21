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
        // 上書きする値
        ...style,

        // 上書きを許容しない値
        ...{
          zIndex: 1000,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
      {...rest}
    />
  );
};
