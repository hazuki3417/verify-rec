import React from "react";
import { createContext, useContext } from "react";

export type MessageStatus = "success" | "info" | "warning" | "error";
export type MessageContextType = {
  status: MessageStatus;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

/**
 * Messageコンポーネントのコンテキスト型定義
 * @typedef {Object} MessageContextType
 * @property {"success" | "info" | "warning" | "error"} status - メッセージの状態
 */

/**
 * MessageContextの値を取得するカスタムフック
 * @returns {MessageContextType} メッセージコンテキストの値
 * @throws {Error} MessageProvider外で使用された場合にエラーをスロー
 */
export const useMessageContext = () => {
  const ctx = useContext(MessageContext);
  if (!ctx)
    throw new Error("useMessageContext must be used within a MessageProvider");
  return ctx;
};

export const MessageProvider = MessageContext.Provider;
