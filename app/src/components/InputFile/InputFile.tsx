import React, { useRef, type ChangeEvent } from "react";
import { InputFileProvider } from "./InputFileProvider";
import { InputFileButtonContainer } from "./InputFileButtonContainer";
import { InputFileDropArea } from "./InputFileDropArea";

type BaseProps = React.ComponentPropsWithoutRef<"input">;

export interface InputFileProps
  extends Omit<
    BaseProps,
    "type" | "style" | "onClick" | "onChange" | "accept"
  > {
  onFileChange?: (files: FileList) => void;
}

/**
 * ファイル入力を提供するコンポーネント（デザインレス）
 * NOTE: 画面や機能によってファイル入力を提供するデザインに差異があるため
 *       ファイル選択・ファイルドロップによるファイル入力を提供する処理のみを実装
 *       onFileChangeはファイル選択・ドラッグ & ドロップ どちらでも発火します。
 * @param props
 * @returns
 */
export const InputFile = (props: InputFileProps) => {
  const { children, onFileChange, multiple, disabled, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handledDialog = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleFileChange = (files: FileList) => {
    onFileChange?.(files);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    handleFileChange(event.target.files);
    event.target.value = ""; // 同一ファイル再選択対応
  };

  return (
    <InputFileProvider
      value={{
        disabled,
        multiple,
      }}
      handler={{
        onFileSelect: handledDialog,
        onFileChange: handleFileChange,
      }}
    >
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleChange}
        multiple={multiple}
        disabled={disabled}
        {...rest}
      />
      {children}
    </InputFileProvider>
  );
};

InputFile.displayName = "InputFile";
InputFile.ButtonContainer = InputFileButtonContainer;
InputFile.DropArea = InputFileDropArea;
