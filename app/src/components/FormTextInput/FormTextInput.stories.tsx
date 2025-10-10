import type { Meta, StoryObj } from "@storybook/react";
import { FormTextInput } from "./FormTextInput";
import { inputVariantStyleMap, type InputVariant } from "@/utils/props";

const meta = {
  title: "Components/Form/FormTextInput",
  component: FormTextInput,
  argTypes: {
    variant: {
      options: Object.keys(inputVariantStyleMap),
    },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof FormTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ValueProp: Story = {
  args: {
    value: "text",
    disabled: true,
  },
};

export const PlaceholderProps: Story = {
  args: {
    placeholder: "例：",
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
                <FormTextInput {...args} variant={value} />
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
            <FormTextInput {...args} error={true} />
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
            <FormTextInput {...args} error={false} />
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
