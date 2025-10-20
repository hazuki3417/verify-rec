import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
  Button,
  buttonSizeStyleMap,
  buttonVariantStyleMap,
  type ButtonSize,
  type ButtonVariant,
} from "./Button";
import { IconAdCircle } from "@/components/Icon";
import { IconText } from "@/components/IconText";

const meta = {
  title: "Components/Button/Button",
  component: Button,
  args: {
    onClick: action("onClick"),
  },
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

export const VariantProp: Story = {
  render: (args) => {
    return (
      <div>
        {Object.entries(buttonVariantStyleMap).map(([prop]) => {
          const value = prop as ButtonVariant;
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
                <Button {...args} variant={value}>
                  button
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const SizeProp: Story = {
  render: (args) => {
    return (
      <div>
        {Object.entries(buttonSizeStyleMap).map(([prop]) => {
          const value = prop as ButtonSize;
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
                <Button {...args} size={value}>
                  button
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const IconTextButton: Story = {
  render: (args) => (
    <Button {...args}>
      <IconText icon={<IconAdCircle />}>
        保存
      </IconText>
    </Button>
  ),
};
