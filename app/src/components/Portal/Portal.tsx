import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "./ToastContainer";
import { ModalContainer } from "./ModalContainer";
import { TooltipContainer } from "./TooltipContainer";

export interface PortalProps {
  children: React.ReactNode;
}

/**
 * @typedef {Object} PortalProps
 * @property {React.ReactNode} children
 */

/**
 * @param {PortalProps} props
 * @returns
 */
export const Portal = (props: PortalProps) => {
  const { children } = props;
  return ReactDOM.createPortal(children, document.getElementById("portal")!);
};

/**
 * Compound Components パターン と呼ばれる実装デザインパターン
 * NOTE: z-indexの順位は下記のようになるよう調整してください
 *       tooltop > toast > modal
 * TODO: drawerも対応できるように拡張する
 * TODO: toastの表示位置を指定できるように拡張する
 * TODO: tooltipの表示位置を指定できるように拡張する
 */
Portal.ModalContainer = ModalContainer;
Portal.TooltipContainer = TooltipContainer;
Portal.ToastContainer = ToastContainer;
