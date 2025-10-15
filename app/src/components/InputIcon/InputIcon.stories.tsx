import type { Meta, StoryObj } from "@storybook/react";
import { InputIcon } from "./InputIcon";

const meta = {
  title: "Components/InputIcon",
  component: InputIcon,
} satisfies Meta<typeof InputIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: true,
    viewBox: "0 0 24 24",
    children: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <path d="M5 12l4 4 10-10" />
      </>
    ),
  },
};
