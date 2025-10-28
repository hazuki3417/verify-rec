import React, { type DragEvent } from "react";
import { useInputFileContext } from "./InputFile.context";
import styled from "styled-components";
import type { StyledProps } from "@/utils/props";

interface StyleProps {}

const Base = styled.div<StyledProps<StyleProps>>`
  cursor: pointer;
`;

type BaseProps = React.ComponentPropsWithoutRef<"div">;

export interface InputFileDropAreaProps
  extends Omit<BaseProps, "onDrop" | "onDragOver"> {}

export const InputFileDropArea = (props: InputFileDropAreaProps) => {
  const { ...rest } = props;
  const context = useInputFileContext();

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length <= 0) {
      return;
    }
    context.onFileChange(files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return <Base onDrop={handleDrop} onDragOver={handleDragOver} {...rest} />;
};
