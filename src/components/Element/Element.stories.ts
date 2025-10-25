import type { Meta, StoryObj } from "@storybook/react";
import { Element } from ".";

const meta: Meta<typeof Element> = {
  title: "Components/Element",
  component: Element,

  argTypes: {
    property1: {
      options: ["icon"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Element>;

export const Default: Story = {
  args: {
    property1: "icon",
    className: {},
  },
};
