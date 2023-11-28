import type { Meta, StoryObj } from "@storybook/react";
import { objFromUseInput } from "../hooks/useInput";
import { MyInput } from "@/shared/UI";

const meta = {
  title: "UI/MyInput",
  component: MyInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof MyInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const data: objFromUseInput = {
  value: "",
  error: "",
  onBlur: () => {},
  onChange: () => {},
  isDirty: true,
  onSetValue: () => {},
  clear: () => {},
};

export const TextField: Story = {
  args: {
    data,
    variant: "text",
    placeholder: "text",
    label: "Label",
    disabled: false,
  },
};

export const Password: Story = {
  args: {
    data,
    variant: "password",
    placeholder: "****",
    label: "Password",
    disabled: false,
  },
};

export const TextFieldDisabled: Story = {
  args: {
    data,
    variant: "text",
    placeholder: "text",
    label: "Label",
    disabled: true,
  },
};
