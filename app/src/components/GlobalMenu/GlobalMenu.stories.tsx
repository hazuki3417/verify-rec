import type { Meta, StoryObj } from "@storybook/react";
import { GlobalMenu } from "./GlobalMenu";
import { IconText } from "../IconText";
import { IconAdCircle } from "../Icon";

const meta = {
  title: "Components/GlobalMenu",
  component: GlobalMenu,
} satisfies Meta<typeof GlobalMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Example1: Story = {
  args: {
    children: (
      <>
        <GlobalMenu.Item active>
          <IconText
            icon={<IconAdCircle size="24" color="emerald" />}
            style={{ gap: "8px" }}
          >
            図面検索
          </IconText>
        </GlobalMenu.Item>
        <GlobalMenu.Item>
          <IconText icon={<IconAdCircle size="24" />} style={{ gap: "8px" }}>
            案件管理
          </IconText>
        </GlobalMenu.Item>
        <GlobalMenu.Item>
          <IconText icon={<IconAdCircle size="24" />} style={{ gap: "8px" }}>
            案件管理
          </IconText>
        </GlobalMenu.Item>
        <GlobalMenu.Item>
          <IconText icon={<IconAdCircle size="24" />} style={{ gap: "8px" }}>
            図面登録
          </IconText>
        </GlobalMenu.Item>
      </>
    ),
  },
};
