import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputToggle } from "./InputToggle";
import { inputVariantStyleMap, type InputVariant } from "@/utils/props";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { IconX } from "../Icon";

const meta = {
  title: "Components/InputToggle",
  component: InputToggle,
  args: {
    node: {
      on: <IconX color="pealEmerald" />,
      off: <IconX color="pealGray" />,
    },
  },
} satisfies Meta<typeof InputToggle>;

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
          <InputToggle
            node={{
              on: <IconX color="pealEmerald" />,
              off: <IconX color="pealGray" />,
            }}
            {...methods.register("value")}
          />
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
              <InputToggle
                node={{
                  on: <IconX color="pealEmerald" />,
                  off: <IconX color="pealGray" />,
                }}
                {...field}
              />
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
            <InputToggle {...args} disabled={true} />
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
            <InputToggle {...args} disabled={false} />
          </div>
        </div>
      </div>
    );
  },
};
