import React, { useState, type DragEvent } from "react";
import { useInputFileContext } from "./InputFile.context";
import styled from "styled-components";
import type { StyledProps } from "@/utils/props";

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
  cursor: pointer;

  // NOTE: ドラッグアンドドロップのスタイルを指定する場合は
  //       呼び出し側で下記の属性セレクタを指定してスタイルを定義してください

  /* ドラッグ中のスタイルを指定 */
  &[data-drag-state="active"] {

  }

  /* 通常状態のスタイルを指定 */
  &[data-drag-state="idle"] {

  }
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface InputFileDropAreaProps
  extends Omit<
    BaseProps,
    "onDrop" | "onDragOver" | "onDragEnter" | "onDragLeave"
  > {}

export const InputFileDropArea = (props: InputFileDropAreaProps) => {
  const { ...rest } = props;
  const context = useInputFileContext();
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);

    // 非活性ならドラッグアンドドロップによるファイル選択を無効化
    if (context.disabled) return;

    const inputFiles = Array.from(event.dataTransfer.files);

    // multipleがfalseなら1件だけ採用
    const handleFiles = context.multiple ? inputFiles : inputFiles.slice(0, 1);

    if (handleFiles.length <= 0) {
      return;
    }

    const dt = new DataTransfer();
    handleFiles.forEach((file) => dt.items.add(file));
    context.onFileChange(dt.files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Base
      data-drag-state={isDragActive ? "active" : "idle"}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      {...rest}
    />
  );
};
