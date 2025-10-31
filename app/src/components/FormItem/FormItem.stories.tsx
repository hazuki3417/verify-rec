import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormItem } from "./FormItem";
import { InputText } from "../InputText";

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
