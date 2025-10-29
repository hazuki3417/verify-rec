import React from "react";
import { createContext, useContext } from "react";

export interface InputFileContextValue {
  multiple: boolean | undefined;
  disabled: boolean | undefined;
  isDragActive: boolean;
}

export interface InputFileContextHandler {
  onFileSelect: () => void;
  onFileChange: (files: FileList) => void;
}

export interface InputFileContextAction {
  setDragActive: (active: boolean) => void;
}

export type InputFileContextType = {
  value: InputFileContextValue;
  handler: InputFileContextHandler;
  action: InputFileContextAction;
};

export const InputFileContext = createContext<InputFileContextType | undefined>(
  undefined,
);

/**
 * InputFileContextの値を取得するカスタムフック
 * @returns {InputFileContextType} メッセージコンテキストの値
 * @throws {Error} InputFileProvider外で使用された場合にエラーをスロー
 */
export const useInputFileContext = () => {
  const ctx = useContext(InputFileContext);
  if (!ctx)
    throw new Error(
      "useInputFileContext must be used within a InputFileProvider",
    );
  return ctx;
};
