import type { Meta, StoryObj } from "@storybook/react";
import MyButton from "../components/UI/MyButton/MyButton";
import "../components/UI/MyButton/MyButton.scss";

const meta = {
  title: "UI/Button",
  component: MyButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MyButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    label: "Button",
    variant: "text",
  },
};

export const TextDisabled: Story = {
  args: {
    label: "Button",
    variant: "text",
    disabled: true,
  },
};

export const Filled: Story = {
  args: {
    label: "Button",
    variant: "filled",
  },
};

export const FilledDisabled: Story = {
  args: {
    label: "Button",
    variant: "filled",
    disabled: true,
  },
};
