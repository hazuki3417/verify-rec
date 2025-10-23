import React from "react";
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
import { Text } from "@/components/Text";

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
  args: {
    children: "button",
  },
};

export const VariantProp: Story = {
  args: {
    children: "button",
  },
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
                <Button {...args} variant={value} />
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const SizeProp: Story = {
  args: {
    children: "button",
  },
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
                <Button {...args} size={value} />
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const DisabledProp: Story = {
  args: {
    children: "button",
  },
  render: (args) => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "8px",
          }}
        >
          <div>true</div>
          <div>
            <Button {...args} disabled={true} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "8px",
          }}
        >
          <div>false</div>
          <div>
            <Button {...args} disabled={false} />
          </div>
        </div>
      </div>
    );
  },
};

export const IconTextButton: Story = {
  args: {
    children: <IconText icon={<IconAdCircle />}>保存</IconText>,
  },
  render: (args) => <Button {...args} />,
};

export const TextButton: Story = {
  args: {
    // NOTE: button childrenから渡されるstyleを任意のコンポーネントに渡して連動するように実装する例
    children: (style) => <Text style={style}>保存</Text>,
  },
  render: (args) => <Button {...args} />,
};
