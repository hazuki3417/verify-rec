import React from "react";
import { createContext, useContext } from "react";

export type InputFileContextType = {
  onFileSelect: () => void;
  onFileChange: (files: FileList) => void;
};

const InputFileContext = createContext<InputFileContextType | undefined>(
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

export const InputFileProvider = InputFileContext.Provider;
