import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { HoverToggle } from "./HoverToggle";

const meta = {
  title: "HoverToggle",
  component: HoverToggle,
  args: {
    onClick: action("onClick"),
  },
} satisfies Meta<typeof HoverToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <HoverToggle.On>ホバーしていないときの表示</HoverToggle.On>
        <HoverToggle.Off>ホバーしたときの表示</HoverToggle.Off>
      </>
    ),
  },
};
