import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Suggest } from "./Suggest";
import { InputText } from "../InputText";

const meta = {
  title: "Components/Suggest",
  component: Suggest,
} satisfies Meta<typeof Suggest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Example: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <InputText />
      <Suggest style={{ borderRadius: "0px 0px 4px 4px" }}>
        <Suggest.Item>aaa</Suggest.Item>
        <Suggest.Item>bbb</Suggest.Item>
        <Suggest.Item>ccc</Suggest.Item>
      </Suggest>
    </div>
  ),
};
