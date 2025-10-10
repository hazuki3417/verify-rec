import type { Meta, StoryObj } from "@storybook/react";
import { Portal } from "./Portal";

const meta = {
  title: "Portal",
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
