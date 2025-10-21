import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Portal } from "./Portal";
import { Overlay } from "../Overlay";
import { Modal } from "../Modal";
import { Text } from "../Text";
import { ActionPanel } from "../ActionPanel";
import { useState } from "react";
import { Message } from "../Message";

const meta = {
  title: "Components/Portal",
  component: Portal,
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "portal",
  },
};

const SampleModal = ({ onClose }: { onClose: () => void }) => (
  <Modal>
    <Modal.CloseButton onClick={onClose} />
    <Modal.Header>
      <Text fontSize="20" fontWeight="bold">
        モーダルタイトル
      </Text>
    </Modal.Header>
    <Modal.Body>
      <Text>これはPortalを使用したモーダルの実装例です。</Text>
    </Modal.Body>
    <Modal.Divider />
    <Modal.Footer>
      <ActionPanel>
        <ActionPanel.Center style={{ display: "flex", gap: "8px" }}>
          <button onClick={onClose}>キャンセル</button>
          <button onClick={onClose}>保存</button>
        </ActionPanel.Center>
      </ActionPanel>
    </Modal.Footer>
  </Modal>
);

/**
 * PortalとModalを組み合わせた実装例
 */
export const ExampleModal: Story = {
  args: { children: null },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    return (
      <>
        <button onClick={handleOpen}>モーダルを開く</button>

        {isOpen && (
          <Portal>
            <Portal.ModalContainer>
              <Overlay onClick={handleClose} />
              <SampleModal onClose={handleClose} />
            </Portal.ModalContainer>
          </Portal>
        )}
      </>
    );
  },
};

const SampleToast = ({ onClose }: { onClose: () => void }) => (
  <Message status="success">
    <Message.CloseButton onClick={onClose} />
    <Message.Title>保存しました</Message.Title>
  </Message>
);

/**
 * PortalとModalを組み合わせた実装例
 */
export const ExampleToast: Story = {
  args: { children: null },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    return (
      <>
        <button onClick={handleOpen}>トーストを表示</button>

        {isOpen && (
          <Portal>
            <Portal.ToastContainer>
              <SampleToast onClose={handleClose} />
            </Portal.ToastContainer>
          </Portal>
        )}
      </>
    );
  },
};
