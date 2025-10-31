import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputNumber } from "./InputNumber";
import { inputVariantStyleMap, type InputVariant } from "@/utils/props";
import { Controller, FormProvider, useForm } from "react-hook-form";

const meta = {
  title: "Components/InputNumber",
  component: InputNumber,
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
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const FormDataView = ({ formData }: { formData: any }) => (
  <pre
    style={{
      background: "#f8f8f8",
      padding: "8px",
      borderRadius: "4px",
      fontSize: "12px",
      whiteSpace: "pre-wrap",
    }}
  >
    {JSON.stringify(formData, null, 2)}
  </pre>
);

export const Uncontrolled: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        name: "",
      },
    });
    return (
      <FormProvider {...methods}>
        <div
          style={{
            display: "inline-flex",
            gap: "8px",
            flexDirection: "column",
          }}
        >
          <div>Uncontrolled form</div>
          <InputNumber {...methods.register("name")} />
          <FormDataView formData={methods.watch()} />
        </div>
      </FormProvider>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        name: "",
      },
    });
    return (
      <FormProvider {...methods}>
        <div
          style={{
            display: "inline-flex",
            gap: "8px",
            flexDirection: "column",
          }}
        >
          <div>controlld form</div>
          <Controller
            name="name"
            control={methods.control}
            render={({ field }) => <InputNumber {...field} />}
          />
          <FormDataView formData={methods.watch()} />
        </div>
      </FormProvider>
    );
  },
};

export const PlaceholderProps: Story = {
  args: {
    placeholder: "例：",
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
            <InputNumber {...args} disabled={true} />
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
            <InputNumber {...args} disabled={false} />
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
                <InputNumber {...args} variant={value} />
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
            <InputNumber {...args} error={true} />
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
            <InputNumber {...args} error={false} />
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
