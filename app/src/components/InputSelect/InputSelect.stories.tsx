import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputSelect } from "./InputSelect";
import { inputVariantStyleMap, type InputVariant } from "@/utils/props";
import { Controller, FormProvider, useForm } from "react-hook-form";

const meta = {
  title: "Components/InputSelect",
  component: InputSelect,
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
} satisfies Meta<typeof InputSelect>;

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
        value: "",
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
          <InputSelect {...methods.register("value")}>
            <InputSelect.Option value="option1">Option 1</InputSelect.Option>
            <InputSelect.Option value="option2">Option 2</InputSelect.Option>
            <InputSelect.Option value="option3">Option 3</InputSelect.Option>
          </InputSelect>
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
        value: "",
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
            name="value"
            control={methods.control}
            render={({ field }) => (
              <InputSelect {...field}>
                <InputSelect.Option value="option1">
                  Option 1
                </InputSelect.Option>
                <InputSelect.Option value="option2">
                  Option 2
                </InputSelect.Option>
                <InputSelect.Option value="option3">
                  Option 3
                </InputSelect.Option>
              </InputSelect>
            )}
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
    children: (<>
      <InputSelect.Option value="option1">Option 1</InputSelect.Option>
      <InputSelect.Option value="option2">Option 2</InputSelect.Option>
      <InputSelect.Option value="option3">Option 3</InputSelect.Option>
    </>)
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
            <InputSelect {...args} disabled={true}>
              <InputSelect.Option value="option1">Option 1</InputSelect.Option>
              <InputSelect.Option value="option2">Option 2</InputSelect.Option>
              <InputSelect.Option value="option3">Option 3</InputSelect.Option>
            </InputSelect>
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
            <InputSelect {...args} disabled={false}>
              <InputSelect.Option value="option1">Option 1</InputSelect.Option>
              <InputSelect.Option value="option2">Option 2</InputSelect.Option>
              <InputSelect.Option value="option3">Option 3</InputSelect.Option>
            </InputSelect>
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
                <InputSelect {...args} variant={value}>
                  <InputSelect.Option value="option1">
                    Option 1
                  </InputSelect.Option>
                  <InputSelect.Option value="option2">
                    Option 2
                  </InputSelect.Option>
                  <InputSelect.Option value="option3">
                    Option 3
                  </InputSelect.Option>
                </InputSelect>
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
            <InputSelect {...args} error={true}>
              <InputSelect.Option value="option1">Option 1</InputSelect.Option>
              <InputSelect.Option value="option2">Option 2</InputSelect.Option>
              <InputSelect.Option value="option3">Option 3</InputSelect.Option>
            </InputSelect>
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
            <InputSelect {...args} error={false}>
              <InputSelect.Option value="option1">Option 1</InputSelect.Option>
              <InputSelect.Option value="option2">Option 2</InputSelect.Option>
              <InputSelect.Option value="option3">Option 3</InputSelect.Option>
            </InputSelect>
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
