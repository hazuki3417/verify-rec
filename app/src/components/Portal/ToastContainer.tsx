import React from "react";
import { Container, type ContainerProps } from "./Container";

export interface ToastContainerProps extends ContainerProps {}

/**
 * portalとtoast contentの間に配置するコンテナーコンポーネント
 * @returns
 */
export const ToastContainer = (props: ToastContainerProps) => {
  const { style, ...rest } = props;

  /**
   * NOTE: 右下表示固定。
   *       右下以外で表示したいケースが発生した場合、
   *       propsを拡張して任意の場所に表示できるよう改修してください。
   *       例) top-{left,center,right},
   *           center-{left,center,right}
   *           bottom-{left,center,right}
   *           9パターン もしくはcernterを除外した四隅の4パターン
   *       styleでcss指定する方法でもよい
   */

  return (
    <Container
      style={{
        // 初期値
        bottom: "16px",
        right: "16px",

        // 上書きする値
        ...style,

        // 上書きを許容しない値
        ...{
          zIndex: 1100,
        },
      }}
      {...rest}
    />
  );
};
