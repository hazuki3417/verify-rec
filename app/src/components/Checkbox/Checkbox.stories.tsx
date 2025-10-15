import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox/Checkbox",
  component: Checkbox,
  args: {
    onClick: action("onClick"),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
