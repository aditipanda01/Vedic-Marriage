import type { Meta, StoryObj } from "@storybook/react";
import { ListRows } from ".";

const meta: Meta<typeof ListRows> = {
  title: "Components/ListRows",
  component: ListRows,

  argTypes: {
    property1: {
      options: ["label-free-text", "free-text"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ListRows>;

export const Default: Story = {
  args: {
    property1: "label-free-text",
    className: {},
    divClassName: {},
    text: "Body 14pt",
    divClassNameOverride: {},
    text1: "Label 11pt",
    divClassName1: {},
  },
};
