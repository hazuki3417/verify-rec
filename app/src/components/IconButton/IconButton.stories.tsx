import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  IconButton,
  iconButtonSizeStyleMap,
  type IconButtonSize,
} from "./IconButton";
import { IconPencil } from "../Icon";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  args: {
    onClick: action("onClick"),
  },
  argTypes: {
    size: {
      options: Object.keys(iconButtonSizeStyleMap),
      control: "select",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <IconPencil size="36" />,
  },
};

export const SetIcon: Story = {
  args: {
    children: <IconPencil size="36" />,
  },
};

export const SizeProp: Story = {
  args: {
    children: <IconPencil size="36" />,
  },
  render: (args) => {
    return (
      <div>
        {Object.entries(iconButtonSizeStyleMap).map(([prop]) => {
          const value = prop as IconButtonSize;
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
                <IconButton {...args} size={value} />
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
    children: <IconPencil size="36" />,
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
            <IconButton {...args} disabled={true} />
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
            <IconButton {...args} disabled={false} />
          </div>
        </div>
      </div>
    );
  },
};
