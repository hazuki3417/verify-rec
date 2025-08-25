import type { Meta, StoryObj } from "@storybook/react";
import { FormLabel } from "./FormLabel";

const meta = {
	title: "Form/FormLabel",
	component: FormLabel,
} satisfies Meta<typeof FormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const SetChildren: Story = {
	args: {
		children: "項目1",
	},
};
