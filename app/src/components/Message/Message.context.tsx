import React from "react";
import { createContext, useContext } from "react";

export type MessageStatus = "success" | "info" | "warning" | "error";
export type MessageContextType = {
  status: MessageStatus;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessageContext = () => {
  const ctx = useContext(MessageContext);
  if (!ctx)
    throw new Error("useMessageContext must be used within a MessageProvider");
  return ctx;
};

export const MessageProvider = MessageContext.Provider;
