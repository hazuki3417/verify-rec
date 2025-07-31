import type { Meta, StoryObj } from "@storybook/react";
import { FormTextValue } from "./FormTextValue";

const meta = {
	title: "Form/FormTextValue",
	component: FormTextValue,
} satisfies Meta<typeof FormTextValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const SetChildren: Story = {
	args: {
		children: "text value",
	},
};
