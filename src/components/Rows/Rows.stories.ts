import type { Meta, StoryObj } from "@storybook/react";
import { Rows } from ".";

const meta: Meta<typeof Rows> = {
  title: "Components/Rows",
  component: Rows,

  argTypes: {
    property1: {
      options: [
        "name-label",
        "icon-name",
        "icon-name-label",
        "label-free-text",
        "sub-section-title",
        "free-text",
        "name",
      ],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Rows>;

export const Default: Story = {
  args: {
    property1: "name-label",
    className: {},
    divClassName: {},
    text: "Body 14pt",
    divClassNameOverride: {},
    overlapGroupClassName: {},
    text1: "Label 11pt",
    text2: "Caption 12pt",
  },
};
