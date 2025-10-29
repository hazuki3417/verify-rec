import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputFile } from "./InputFile";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import styled from "styled-components";
import { theme } from "@/theme";

const meta = {
  title: "Components/InputFile",
  component: InputFile,
} satisfies Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormDataView = ({ formData }: { formData: any }) => {
  const safeData = {
    ...formData,
    files: formData?.files?.map((f: File) => ({
      name: f.name,
      size: f.size,
      type: f.type,
    })),
  };

  return (
    <pre
      style={{
        background: "#f8f8f8",
        padding: "8px",
        borderRadius: "4px",
        fontSize: "12px",
        whiteSpace: "pre-wrap",
      }}
    >
      {JSON.stringify(safeData, null, 2)}
    </pre>
  );
};

export const Default: Story = {
  render: () => {
    const methods = useForm<{ files: File[] }>({
      defaultValues: {
        files: [],
      },
    });

    const handleFileChange = (files: FileList) => {
      const attachs = Array.from(files);
      methods.setValue("files", attachs);
    };

    return (
      <div
        style={{
          display: "inline-flex",
          gap: "8px",
          flexDirection: "column",
        }}
      >
        <InputFile onFileChange={handleFileChange}>
          <InputFile.ButtonContainer>
            {/* NOTE: OS標準のダイアログを開くクリックイベントの実装は不要。
                      イベントのバブリングによりButtonのonClickイベントはButtonContainerまで伝播し、
                      ButtonContainer側で実装されているonClickイベントが発火するため。
            */}
            <Button type="button">attache</Button>
          </InputFile.ButtonContainer>
          <InputFile.DropArea
            style={{
              border: "1px solid #aaaaaa",
              borderRadius: "4px",
              padding: "10px",
            }}
          >
            drop area
          </InputFile.DropArea>
        </InputFile>
        <FormDataView formData={methods.watch()} />
      </div>
    );
  },
};

const StyledInputFileDropArea = styled(InputFile.DropArea)`
  /* ドラッグ中のスタイルを指定 */
  color: ${theme.color.base.riverBlue};
  background-color: ${theme.color.base.pealGray};
  &[data-drag-state="active"] {
    opacity: 0.5;
  }
`;

/**
 * NOTE: 呼び出し側でドラッグアンドドロップのスタイルを指定する例
 */
export const DragAndDropStyle: Story = {
  render: () => {
    const methods = useForm<{ files: File[] }>({
      defaultValues: {
        files: [],
      },
    });

    const handleFileChange = (files: FileList) => {
      const attachs = Array.from(files);
      methods.setValue("files", attachs);
    };

    return (
      <div
        style={{
          display: "inline-flex",
          gap: "8px",
          flexDirection: "column",
        }}
      >
        <InputFile onFileChange={handleFileChange}>
          <InputFile.ButtonContainer>
            {/* NOTE: OS標準のダイアログを開くクリックイベントの実装は不要。
                      イベントのバブリングによりButtonのonClickイベントはButtonContainerまで伝播し、
                      ButtonContainer側で実装されているonClickイベントが発火するため。
            */}
            <Button type="button">attache</Button>
          </InputFile.ButtonContainer>
          <StyledInputFileDropArea
            style={{
              border: "1px solid #aaaaaa",
              borderRadius: "4px",
              padding: "10px",
            }}
          >
            drop area
          </StyledInputFileDropArea>
        </InputFile>
        <FormDataView formData={methods.watch()} />
      </div>
    );
  },
};
