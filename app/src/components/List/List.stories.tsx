import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";

const meta = {
  title: "Components/List",
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <List.Item>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
        <List.Item show={false}>Item 3</List.Item>
      </>
    ),
  },
};
