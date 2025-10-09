import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ActionPanel } from "./ActionPanel";

const meta = {
  title: "ActionPanel",
  component: ActionPanel,
} satisfies Meta<typeof ActionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const LeftCenterRight: Story = {
  args: {
    children: (
      <>
        <ActionPanel.Left>
          <button>delete</button>
        </ActionPanel.Left>
        <ActionPanel.Center>
          <button>cancel</button>
        </ActionPanel.Center>
        <ActionPanel.Right>
          <button>ok</button>
        </ActionPanel.Right>
      </>
    ),
  },
};

export const LeftAndCenter: Story = {
  args: {
    children: (
      <>
        <ActionPanel.Left>
          <button>cancel</button>
        </ActionPanel.Left>
        <ActionPanel.Center>
          <button>ok</button>
        </ActionPanel.Center>
      </>
    ),
  },
};

export const CenterAndRight: Story = {
  args: {
    children: (
      <>
        <ActionPanel.Center>
          <button>cancel</button>
        </ActionPanel.Center>
        <ActionPanel.Right>
          <button>ok</button>
        </ActionPanel.Right>
      </>
    ),
  },
};

export const LeftAndRight: Story = {
  args: {
    children: (
      <>
        <ActionPanel.Left>
          <button>cancel</button>
        </ActionPanel.Left>
        <ActionPanel.Right>
          <button>ok</button>
        </ActionPanel.Right>
      </>
    ),
  },
};

export const LeftOnly: Story = {
  args: {
    children: (
      <>
        <ActionPanel.Left style={{ display: "flex", gap: "8px" }}>
          <button>ok</button>
          <button>cancel</button>
        </ActionPanel.Left>
      </>
    ),
  },
};

export const CenterOnly: Story = {
  args: {
    children: (
      <>
        <ActionPanel.Center style={{ display: "flex", gap: "8px" }}>
          <button>ok</button>
          <button>cancel</button>
        </ActionPanel.Center>
      </>
    ),
  },
};

export const RightOnly: Story = {
  args: {
    children: (
      <>
        <ActionPanel.Right style={{ display: "flex", gap: "8px" }}>
          <button>ok</button>
          <button>cancel</button>
        </ActionPanel.Right>
      </>
    ),
  },
};
