import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ListMenu } from "./ListMenu";

const meta = {
  title: "ListMenu",
  component: ListMenu,
} satisfies Meta<typeof ListMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Example1: Story = {
  args: {
    children: (
      <ListMenu>
        <ListMenu.Item onClick={action("onEditImage")}>
          図面に書き込み
        </ListMenu.Item>
        <ListMenu.Item onClick={action("onEditImage")}>
          図面ファイルの差し替え
          <br />
          （バージョン追加）
        </ListMenu.Item>
        <ListMenu.Item onClick={action("onEditImage")}>
          図面の向きを変更
        </ListMenu.Item>
      </ListMenu>
    ),
  },
};

export const Example2: Story = {
  args: {
    children: (
      <ListMenu>
        <ListMenu.Item onClick={action("onEditImage")}>
          図面に書き込み
        </ListMenu.Item>
        <ListMenu.Item onClick={action("onEditImage")}>
          図面ファイルの差し替え
          <br />
          （バージョン追加）
        </ListMenu.Item>
        <ListMenu.Item show={false} onClick={action("onEditImage")}>
          図面の向きを変更
        </ListMenu.Item>
      </ListMenu>
    ),
  },
};
