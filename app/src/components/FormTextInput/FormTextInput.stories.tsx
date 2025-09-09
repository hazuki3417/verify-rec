import type { Meta, StoryObj } from "@storybook/react";
import { FormTextInput } from "./FormTextInput";

const meta = {
  title: "Form/FormTextInput",
  component: FormTextInput,
  argTypes: {
    error: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof FormTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SetValue: Story = {
  args: {
    value: "text",
    placeholder: "例：",
  },
};
