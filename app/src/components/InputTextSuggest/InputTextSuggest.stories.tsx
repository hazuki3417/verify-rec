import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputTextSuggest } from "./InputTextSuggest";
import { inputVariantStyleMap, type InputVariant } from "@/utils/props";
import { Controller, FormProvider, useForm } from "react-hook-form";

const suggestions = [
  "図面番号1",
  "図面番号2",
  "図面番号3",
  "図面番号4",
  "図面番号5",
  "図面番号6",
  "図面番号7",
  "図面番号8",
  "図面番号9",
];

const meta = {
  title: "Components/InputTextSuggest",
  component: InputTextSuggest,
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
  args: {
    suggestions,
  },
} satisfies Meta<typeof InputTextSuggest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
          <Controller
            name="value"
            control={methods.control}
            render={({ field }) => (
              <InputTextSuggest suggestions={suggestions} {...field} />
            )}
          />
          <FormDataView formData={methods.watch()} />
        </div>
      </FormProvider>
    );
  },
};

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
          <InputTextSuggest
            suggestions={suggestions}
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
          <div>controlled form</div>
          <Controller
            name="value"
            control={methods.control}
            render={({ field }) => (
              <InputTextSuggest suggestions={suggestions} {...field} />
            )}
          />
          <FormDataView formData={methods.watch()} />
        </div>
      </FormProvider>
    );
  },
};
