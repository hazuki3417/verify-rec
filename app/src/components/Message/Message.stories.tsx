import React, { type CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Message } from "./Message";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";

const meta = {
  title: "Components/Message",
  component: Message,
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "success",
  },
};

export const StatusProp: Story = {
  args: {
    status: "success",
  },
  render: (args) => {
    const style: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      padding: "8px",
    };

    return (
      <div>
        {/* success */}
        <div style={style}>
          <div>{"success"}</div>
          <div>
            <Message status="success">
              <Message.CloseButton />
              <Message.Title>～情報を保存しました</Message.Title>
            </Message>
          </div>
        </div>
        {/* info */}
        <div style={style}>
          <div>{"info"}</div>
          <div>
            <Message status="info">
              <Message.CloseButton />
              <Message.Title>図面の向きを保存しますか？</Message.Title>
              <Message.Content>
                <Button variant="secondary" size="sm">
                  <Text fontWeight="bold">保存する</Text>
                </Button>
              </Message.Content>
            </Message>
          </div>
        </div>
        {/* warning */}
        <div style={style}>
          <div>{"warning"}</div>
          <div>
            <Message status="warning">
              <Message.CloseButton />
              <Message.Title>
                この図面は未確認の情報を含んでいます
              </Message.Title>
              <Message.Title>他の図面と図面番号が重複しています</Message.Title>
              <Message.Content>
                <Text fontSize="12" style={{ marginBottom: "8px" }}>
                  OCRの自動入力内容をご確認のうえ、必要に応じてご修正ください。
                </Text>
                <div style={{ display: "flex", gap: "12px" }}>
                  <Button variant="secondary" size="sm">
                    <Text fontWeight="bold">確認済みにする</Text>
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Text fontWeight="bold">編集する</Text>
                  </Button>
                </div>
              </Message.Content>
            </Message>
          </div>
        </div>
        {/* error */}
        <div style={style}>
          <div>{"error"}</div>
          <div>
            <Message status="error">
              <Message.Title>エラーが発生しました</Message.Title>
              <Message.Content>
                「メモ」：1000文字以内で入力してください。
                <br />
                「カスタム数値」：整数で入力してください。
              </Message.Content>
            </Message>
          </div>
        </div>
      </div>
    );
  },
};

export const Example: Story = {
  args: {
    status: "success",
    children: (
      <>
        <Message.CloseButton />
        <Message.Title>メッセージタイトル1</Message.Title>
        <Message.Content>
          childrenに直接文字列を指定
          <br />
          （親コンポーネントに指定したフォントスタイルを継承するケース）
        </Message.Content>
        <Message.Title>メッセージタイトル2</Message.Title>
        <Message.Content>
          <Text>
            childrenとテキストの間にTextコンポーネントを配置
            <br />
            （親コンポーネントに指定したフォントスタイルを継承しないケース）
          </Text>
        </Message.Content>
      </>
    ),
  },
};
