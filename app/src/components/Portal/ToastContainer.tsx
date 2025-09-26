import React from "react";
import { Container, type ContainerProps } from "./Container";

// export type Position =
//   | "top-left"
//   | "top-center"
//   | "top-right"
//   | "middle-left"
//   | "middle-center"
//   | "middle-right"
//   | "bottom-left"
//   | "bottom-center"
//   | "bottom-right";

// export type PositionProp = { position: Position };

// export type PositionStyleMap = StyleMap<Position>;

// export const positionStyleMap: PositionStyleMap = {
//   "top-left": {},
//   "top-center": {},
//   "top-right": {},
//   "middle-left": {},
//   "middle-center": {},
//   "middle-right": {},
//   "bottom-left": {},
//   "bottom-center": {},
//   "bottom-right": {},
// };

// export const resolvePosition = (arg: ResolverStyleMapArg<Position>) => {
//   const { prop, style } = arg;
//   return styleResolver(prop, style, "top-center");
// };

// export interface ToastContainerStyleProps extends PositionProp {}

export interface ToastContainerProps extends ContainerProps {}

/**
 * portalとtoast contentの間に配置するコンテナーコンポーネント
 * @returns
 */
export const ToastContainer = (props: ToastContainerProps) => {
  const { style, ...rest } = props;
  return (
    <Container
      style={{
        ...style,
        /**
         * NOTE: ここに各Floating UIの差異styleを記述する。
         *       ただしデザインの装飾は含めないこと。
         */
        zIndex: 5000,
      }}
      {...rest}
    />
  );
};
