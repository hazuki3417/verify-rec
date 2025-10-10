import type { Meta, StoryObj } from "@storybook/react";
import { DxfViewer } from "./DxfViewer";

const meta = {
  title: "Components/DxfViewer",
  component: DxfViewer,
} satisfies Meta<typeof DxfViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "/sample1.dxf",
  },
};
