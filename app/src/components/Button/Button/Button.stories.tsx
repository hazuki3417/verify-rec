import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
	title: "Button/Button",
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const SetChildren: Story = {
	args: {
		children: "書き込みした図面を保存",
	},
};
