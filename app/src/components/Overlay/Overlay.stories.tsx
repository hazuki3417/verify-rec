import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Overlay } from "./Overlay";
import { Text } from "../Text";

const meta = {
  title: "Components/Overlay",
  component: Overlay,
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <Text>コンテンツ</Text>
        <Overlay {...args} />
      </div>
    );
  },
};
