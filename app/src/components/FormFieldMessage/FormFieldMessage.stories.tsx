import type { Meta, StoryObj } from "@storybook/react";
import { FormFieldMessage } from "./FormFieldMessage";

const meta = {
  title: "Form/FormFieldMessage",
  component: FormFieldMessage,
} satisfies Meta<typeof FormFieldMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SetChildren: Story = {
  args: {
    children: "メッセージ",
  },
};
