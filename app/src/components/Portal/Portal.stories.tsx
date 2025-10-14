import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Portal } from "./Portal";
import { Overlay } from "../Overlay";
import { Modal } from "../Modal";
import { Text } from "../Text";
import { ActionPanel } from "../ActionPanel";
import { useState } from "react";

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

export const ModalContainer: Story = {
  args: {
    children: <Portal.ModalContainer>Modal content</Portal.ModalContainer>,
  },
};

export const ToastContainer: Story = {
  args: {
    children: <Portal.ToastContainer>Toast content</Portal.ToastContainer>,
  },
};

export const TooltipContainer: Story = {
  args: {
    children: (
      <Portal.TooltipContainer>Tooltip content</Portal.TooltipContainer>
    ),
  },
};

const SampleModal = ({ onClose }: { onClose: () => void }) => {
  return (
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
};

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

const box = {
  backgroundColor: "#0000004d",
  width: "200px",
  height: "200px",
};

/**
 * 各レイヤーの重なりを確認
 */
export const Layer: Story = {
  args: {
    children: (
      <>
        <Portal.ModalContainer
          style={{
            ...box,
            backgroundColor: "blue",
            top: "50px",
            left: "50px",
          }}
        >
          Modal content
        </Portal.ModalContainer>
        <Portal.TooltipContainer
          style={{
            ...box,
            backgroundColor: "red",
            top: "100px",
            left: "100px",
          }}
        >
          Tooltip content
        </Portal.TooltipContainer>
        <Portal.ToastContainer
          style={{
            ...box,
            backgroundColor: "green",
            top: "150px",
            left: "150px",
          }}
        >
          Toast content
        </Portal.ToastContainer>
      </>
    ),
  },
};
