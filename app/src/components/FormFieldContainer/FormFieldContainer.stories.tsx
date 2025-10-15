import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormFieldContainer } from "./FormFieldContainer";
import { InputText } from "../InputText";

const meta = {
  title: "Components/Form/FormFieldContainer",
  component: FormFieldContainer,
} satisfies Meta<typeof FormFieldContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SetLabelTextInput: Story = {
  args: {
    label: "項目1",
    children: <InputText value={"text"} />,
  },
};

export const SetLabelTextInputDescription: Story = {
  args: {
    label: "項目1",
    children: <InputText value={"text"} />,
    description: "補足説明欄",
  },
};

export const SetLabelTextInputMessage: Story = {
  args: {
    label: "項目1",
    children: <InputText value={"text"} />,
    message: "メッセージ",
  },
};

export const SetLabelTextInputDescriptionMessage: Story = {
  args: {
    label: "項目1",
    children: <InputText value={"text"} />,
    description: "補足説明欄",
    message: "メッセージ",
  },
};
