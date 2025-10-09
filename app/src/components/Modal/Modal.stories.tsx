import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Text } from "../Text";
import { ActionPanel } from "../ActionPanel";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Modal",
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Example: Story = {
  args: {
    children: (
      <>
        <Modal.CloseButton onClick={() => action("onClock")} />
        <Modal.Header>
          <Text fontSize="20" fontWeight="bold">
            モーダルタイトル
          </Text>
        </Modal.Header>
        <Modal.Body>body</Modal.Body>
        <Modal.Divider />
        <Modal.Footer>
          <ActionPanel>
            <ActionPanel.Left>left</ActionPanel.Left>
            <ActionPanel.Center style={{ display: "flex", gap: "8px" }}>
              <button>キャンセル</button>
              <button>保存</button>
            </ActionPanel.Center>
            <ActionPanel.Right>right</ActionPanel.Right>
          </ActionPanel>
        </Modal.Footer>
      </>
    ),
  },
};
