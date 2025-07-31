import type { Meta, StoryObj } from "@storybook/react";
import { FormTextInput } from "./FormTextInput";

const meta = {
	title: "Form/FormTextInput",
	component: FormTextInput,
} satisfies Meta<typeof FormTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const SetValue: Story = {
	args: {
		value: "text",
	},
};
