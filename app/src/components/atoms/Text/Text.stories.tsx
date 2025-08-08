import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";
import {
	fontColorToken,
	fontLineHeightToken,
	fontSizeToken,
	fontWeightToken,
} from "../props/font";

const meta = {
	title: "Text",
	component: Text,
	argTypes: {
		fontColor: {
			options: Object.keys(fontColorToken),
		},
		fontLineHeight: {
			options: Object.keys(fontLineHeightToken),
		},
		fontWeight: {
			options: Object.keys(fontWeightToken),
		},
		fontSize: {
			options: Object.keys(fontSizeToken),
		},
	},
} satisfies Meta<typeof Text>;

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
