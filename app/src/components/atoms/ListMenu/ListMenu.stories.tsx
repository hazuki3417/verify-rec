import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ListMenu } from "./ListMenu";

const meta = {
	title: "Components/ListMenu",
	component: ListMenu,
} satisfies Meta<typeof ListMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		items: [],
	},
};

export const SetChildren: Story = {
	args: {
		items: [
			{
				show: true,
				children: "図面に書き込み",
				onClick: action("onEditImage"),
			},
			{
				show: true,
				children: (
					<>
						図面ファイルの差し替え
						<br />
						（バージョン追加）
					</>
				),
				onClick: action("onEditImage"),
			},
			{
				show: true,
				children: "図面の向きを変更",
				onClick: action("onEditImage"),
			},
		],
	},
};
