import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
  IconText,
  iconTextPositionStyleMap,
  type IconTextPosition,
} from "./IconText";
import { IconAdCircle } from "@/components/Icon";
import { Text } from "../Text";

const meta = {
  title: "Components/IconText",
  component: IconText,
  args: {
    onClick: action("onClick"),
  },
} satisfies Meta<typeof IconText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <IconAdCircle />,
    // children: <Text fontSize="16">icon text</Text>,
    children: "icon text",
  },
};

export const PositionProp: Story = {
  args: {
    icon: <IconAdCircle size="24" />,
  },
  render: (args) => {
    return (
      <div>
        {Object.entries(iconTextPositionStyleMap).map(([prop]) => {
          const value = prop as IconTextPosition;
          return (
            <div
              key={prop}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "8px",
              }}
            >
              <div>{prop}</div>
              <div>
                <IconText {...args} position={value}>
                  <Text>図面検索</Text>
                </IconText>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};
