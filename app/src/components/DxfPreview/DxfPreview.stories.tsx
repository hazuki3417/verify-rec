import type { Meta, StoryObj } from "@storybook/react";
import { DxfPreview } from "./DxfPreview";

const meta = {
  title: "DxfPreview",
  component: DxfPreview,
  argTypes: {
    rotate: {
      control: "select",
      options: [0, 90, 180, 270, 360],
    },
    height: {
      control: "select",
      options: [500],
    },
    width: {
      control: {
        type: "range",
        min: 100,
        max: 670,
      },
    },
  },
} satisfies Meta<typeof DxfPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "/sample1.dxf",
    rotate: 0,
    height: 500,
    width: 670,
  },
};
