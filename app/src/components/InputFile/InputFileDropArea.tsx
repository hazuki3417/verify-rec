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
    console.debug("Drag Enter");
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    console.debug("Drag Leave");

    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.contains(event.relatedTarget as Node)) return;
    setIsDragActive(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    console.debug("Drop");

    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    const files = event.dataTransfer.files;
    if (files.length <= 0) {
      return;
    }
    context.onFileChange(files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    console.debug("Drag Over");

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
