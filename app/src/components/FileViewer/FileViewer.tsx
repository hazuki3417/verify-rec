import React from "react";

export interface FileViewerProps {
  src: string;
  contentType: string;
}

export const fileContentTypeMap = {
  glb: [],
  pdf: ["application/pdf", "application/vnc.ms-excel"],
  tiff: ["image/tiff"],
};

export const FileViewer = (props: FileViewerProps) => {
  const {} = props;

  return <div>aa</div>;
};

// ユーティリティ: 拡張子を小文字で返す
const getExtension = (fileName?: string): string | undefined => {
  if (!fileName) return undefined;
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.pop()?.toLowerCase() : undefined;
};
