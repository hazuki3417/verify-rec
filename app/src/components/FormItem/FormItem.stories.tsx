import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormItem } from "./FormItem";
import { InputText } from "../InputText";
import { theme } from "@/theme";
import { Controller, FormProvider, useForm } from "react-hook-form";

const meta = {
  title: "Components/FormItem",
  component: FormItem,
} satisfies Meta<typeof FormItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Example: Story = {
  args: {
    children: (
      <>
        <FormItem.Label>図面番号</FormItem.Label>
        <FormItem.Container>
          <InputText placeholder="例：12345-67890" />
        </FormItem.Container>
        <FormItem.Message>図面番号の入力は必須です</FormItem.Message>
        <FormItem.Description>
          図面番号が衝突した場合、確認のダイアログが表示されます。
        </FormItem.Description>
      </>
    ),
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

export const ExampleUncontrolled: Story = {
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
          <FormItem
            style={{
              backgroundColor: methods.watch("value")
                ? theme.color.sub.pealEmerald
                : undefined,
            }}
          >
            <FormItem.Label>図面番号</FormItem.Label>
            <FormItem.Container>
              <InputText
                placeholder="例：12345-67890"
                {...methods.register("value")}
              />
            </FormItem.Container>
            <FormItem.Message>図面番号の入力は必須です</FormItem.Message>
            <FormItem.Description>
              Inputに値が設定されているときの表示例です。値を監視して装飾を施す実装は含まれていません。（汎用性が下がるため、このコンポーネントの責務に含めない）
            </FormItem.Description>
          </FormItem>
          <FormDataView formData={methods.watch()} />
        </div>
      </FormProvider>
    );
  },
};

export const ExampleControlled: Story = {
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
          <FormItem
            style={{
              backgroundColor: methods.watch("value")
                ? theme.color.sub.pealEmerald
                : undefined,
            }}
          >
            <FormItem.Label>図面番号</FormItem.Label>
            <FormItem.Container>
              <Controller
                name="value"
                control={methods.control}
                render={({ field }) => <InputText {...field} />}
              />
            </FormItem.Container>
            <FormItem.Message>図面番号の入力は必須です</FormItem.Message>
            <FormItem.Description>
              Inputに値が設定されているときの表示例です。値を監視して装飾を施す実装はコンポーネントに含まれていません。（汎用性が下がるためコンポーネントの責務に含めない）
            </FormItem.Description>
          </FormItem>
          <FormDataView formData={methods.watch()} />
        </div>
      </FormProvider>
    );
  },
};
