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
  "Long Option Option Option Option",
];
const placeholder = "Select an option";

const meta: Meta<typeof MySingleDropDown> = {
  title: "UI/SingleDropDown",
  component: MySingleDropDown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["fullWidth", "medium"],
        description:
          "for now only 'fullWidth' and 'medium' size. Medium size is 300px as in figma",
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
    options: {
      control: {
        type: "object",
        description: "options are values, that will be shown in the dropdown",
      },
    },
    className: {
      control: {
        type: "text",
      },
    },
  },
};

// value field is needed for type matching with MySingleDropDown
const singleOptionDropDown: Story = {
  args: {
    value: "",
    options: options,
    placeholder: placeholder,
    size: "medium",
    onChange: () => {},
  },
};

export default meta;

export { singleOptionDropDown };
