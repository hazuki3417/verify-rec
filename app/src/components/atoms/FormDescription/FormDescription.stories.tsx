import type { Meta, StoryObj } from "@storybook/react";
import { FormDescription } from "./FormDescription";

const meta = {
	title: "Form/FormDescription",
	component: FormDescription,
} satisfies Meta<typeof FormDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const SetChildren: Story = {
	args: {
		children: "補足説明",
	},
};
