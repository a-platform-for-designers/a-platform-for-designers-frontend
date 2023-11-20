import type { Meta, StoryObj } from "@storybook/react";
import { MyMultipleDropDown } from "../shared/UI/index";
import "../shared/UI/MyMultipleDropDown/MyMultipleDropDown.scss";

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
  title: "UI/MultipleDropDown",
  component: MyMultipleDropDown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MyMultipleDropDown>;

// value field is needed for type matching with MyMultipleDropDown
const multiOptionDropDownWithDefaultValue: Story = {
  args: {
    value: [],
    options: options,
    placeholder: placeholder,
    size: "medium",
  },
};

const multiOptionDropDown: Story = {
  args: {
    value: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
    options: options,
    placeholder: "",
    size: "medium",
  },
};

export default meta;

export { multiOptionDropDown, multiOptionDropDownWithDefaultValue };
