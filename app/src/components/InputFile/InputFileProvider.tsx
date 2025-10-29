import React, { useState } from "react";
import { InputFileContext } from "./InputFile.context";

export interface InputFileProviderValue {
  multiple: boolean | undefined;
  disabled: boolean | undefined;
}

export interface InputFileProviderHandler {
  onFileSelect: () => void;
  onFileChange: (files: FileList) => void;
}

export type InputFileProviderProps = {
  value: InputFileProviderValue;
  handler: InputFileProviderHandler;
  children: React.ReactNode;
};

export const InputFileProvider = (props: InputFileProviderProps) => {
  const { value, handler, children } = props;
  const [isDragActive, setDragActive] = useState(false);

  return (
    <InputFileContext.Provider
      value={{
        value: {
          ...value,
          isDragActive,
        },
        action: {
          setDragActive,
        },
        handler: {
          ...handler,
        },
      }}
    >
      {children}
    </InputFileContext.Provider>
  );
};
InputFileProvider.displayName = "component/InputFileProvider";
