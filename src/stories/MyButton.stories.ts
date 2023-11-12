import type { Meta, StoryObj } from "@storybook/react";
import MyButton from "../components/UI/MyButton/MyButton";
import "@/components/UI/MyButton/MyButton.scss";

const meta = {
  title: "UI/MyButton",
  component: MyButton,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MyButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fullWidth: false,
    children: "Button",
    variant: "contained",
    size: "medium",
    color: "primary",
    disabled: false,
    disableRipple: false,
    disableElevation: false,
    inverted: false,
    active: false,
    type: "button",
    onClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "Кнопки медиум - min-width 200px, высота - 40px, паддинги 10px 24px, font-size 14px, lineHeight: 20px, letterSpacing: 0.1px. Больше не принимает className и sx, label. Вместо label - children как стандартно в MUI. ",
      },
    },
  },
};

export const Outlined: Story = {
  args: {
    ...Default.args,
    variant: "outlined",
  },
};

export const Text: Story = {
  args: {
    ...Default.args,
    variant: "text",
  },
};

export const Tag: Story = {
  args: {
    ...Default.args,
    variant: "tag",
  },
};

export const TagActive: Story = {
  args: {
    ...Default.args,
    variant: "tag",
    active: true,
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const DisableElevation: Story = {
  args: {
    ...Default.args,
    disableElevation: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Вариант без теней (DisableElevation = true)",
      },
    },
  },
};

export const DisableRipple: Story = {
  args: {
    ...Default.args,
    disableRipple: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Вариант без пульсации при нажатии (DisableRipple = true)",
      },
    },
  },
};
