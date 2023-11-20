import type { Meta, StoryObj } from "@storybook/react";
import { MySingleDropDown } from "../shared/UI/index";
import "../shared/UI/MySingleDropDown/MySingleDropDown.scss";

type Story = StoryObj<typeof meta>;

const options = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
];
const placeholder = "Select an option";

const meta = {
  title: "UI/SingleDropDown",
  component: MySingleDropDown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MySingleDropDown>;

// value field is needed for type matching with MySingleDropDown
const singleOptionDropDown: Story = {
  args: {
    value: "",
    options: options,
    placeholder: placeholder,
    size: "medium",
  },
};

export default meta;

export { singleOptionDropDown };
