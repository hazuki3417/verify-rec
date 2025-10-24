import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputTextarea } from "./InputTextarea";
import { inputVariantStyleMap, type InputVariant } from "@/utils/props";

const meta = {
  title: "Components/InputTextarea",
  component: InputTextarea,
  argTypes: {
    variant: {
      options: Object.keys(inputVariantStyleMap),
    },
    resize: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof InputTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ValueProp: Story = {
  args: {
    value: "text",
  },
};

export const PlaceholderProps: Story = {
  args: {
    placeholder: "例：",
  },
};

export const ResizeProp: Story = {
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
            <InputTextarea {...args} resize={true} />
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
            <InputTextarea {...args} resize={false} />
          </div>
        </div>
      </div>
    );
  },
};

export const DisabledProp: Story = {
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
            <InputTextarea {...args} disabled={true} />
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
            <InputTextarea {...args} disabled={false} />
          </div>
        </div>
      </div>
    );
  },
};

export const VariantProp: Story = {
  render: (args) => {
    return (
      <div>
        {Object.entries(inputVariantStyleMap).map(([prop]) => {
          const value = prop as InputVariant;
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
                <InputTextarea {...args} variant={value} />
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const VariantPropHover: Story = {
  ...VariantProp,
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const VariantPropFocus: Story = {
  ...VariantProp,
  parameters: {
    pseudo: {
      focus: true,
    },
  },
};

export const ErrorProp: Story = {
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
            <InputTextarea {...args} error={true} />
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
            <InputTextarea {...args} error={false} />
          </div>
        </div>
      </div>
    );
  },
};

export const ErrorPropHover: Story = {
  ...ErrorProp,
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const ErrorPropFocus: Story = {
  ...ErrorProp,
  parameters: {
    pseudo: {
      focus: true,
    },
  },
};
