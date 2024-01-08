import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "@mui/material";

const meta = {
  title: "UI/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Checked.args,
    disabled: true,
    checked: false,
  },
};
