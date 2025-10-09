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
          <button>left</button>
        </ActionPanel.Left>
        <ActionPanel.Center>
          <button>center</button>
        </ActionPanel.Center>
        <ActionPanel.Right>
          <button>right</button>
        </ActionPanel.Right>
      </>
    ),
  },
};

export const LeftOnly: Story = {
  args: {
    children: (
      <>
        <ActionPanel.Left>
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
        <ActionPanel.Center>
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
        <ActionPanel.Right>
          <button>ok</button>
          <button>cancel</button>
        </ActionPanel.Right>
      </>
    ),
  },
};
