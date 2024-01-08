import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "@mui/material";

const meta = {
  title: "UI/Container",
  component: Container,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fixed: false,
    maxWidth: false,
    children: (
      <div
        style={{
          border: "1px solid black",
        }}
      >
        Див
      </div>
    ),
  },
};

export const DisabledGutters: Story = {
  args: {
    ...Default.args,
    disableGutters: true,
  },
};
