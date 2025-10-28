import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";
import { theme } from "@/theme";

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: theme.color.base.pealGray,
          padding: "20px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};
