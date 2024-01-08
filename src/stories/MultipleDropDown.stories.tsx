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
  "Long Option Option Option Option Option",
];
const placeholder = "Select an option";

const meta: Meta<typeof MyMultipleDropDown> = {
  title: "UI/MultipleDropDown",
  component: MyMultipleDropDown,
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
    value: {
      control: {
        type: "object",
        description:
          "value is an array of values, that will be selected in the dropdown automatically",
      },
    },
    className: {
      control: {
        type: "text",
      },
    },
  },
};

// value field is needed for type matching with MyMultipleDropDown
const multiOptionDropDownWithDefaultValue: Story = {
  args: {
    value: [],
    options: options,
    placeholder: placeholder,
    size: "medium",
    onChange: () => {},
  },
};

const multiOptionDropDownWithOverflow: Story = {
  args: {
    value: options,
    options: options,
    placeholder: "",
    size: "medium",
    onChange: () => {},
  },
};

const multiOptionDropDown: Story = {
  args: {
    value: ["Option 1", "Option 2"],
    options: options,
    placeholder: "",
    size: "medium",
    onChange: () => {},
  },
};

export default meta;

export {
  multiOptionDropDown,
  multiOptionDropDownWithDefaultValue,
  multiOptionDropDownWithOverflow,
};
