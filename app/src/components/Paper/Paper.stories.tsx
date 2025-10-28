import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Paper } from "./Paper";

const Button = (props: any) => <button {...props} />;

const meta = {
  title: "Components/Paper",
  component: Paper,
} satisfies Meta<typeof Paper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "コンテンツ",
  },
};
