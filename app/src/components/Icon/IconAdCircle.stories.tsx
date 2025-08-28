import type { Meta, StoryObj } from "@storybook/react";
import { IconAdCircle } from "./IconAdCircle";
import { iconColorValueMap, iconSizeValueMap } from "../props/icon";

const meta = {
	title: "IconAdCircle",
	component: IconAdCircle,
	argTypes: {
		iconSize: {
			options: Object.keys(iconSizeValueMap),
		},
		iconColor: {
			options: Object.keys(iconColorValueMap),
		},
	},
} satisfies Meta<typeof IconAdCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
