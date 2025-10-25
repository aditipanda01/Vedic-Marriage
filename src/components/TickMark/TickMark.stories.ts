import type { Meta, StoryObj } from "@storybook/react";
import { TickMark } from ".";

const meta: Meta<typeof TickMark> = {
  title: "Components/TickMark",
  component: TickMark,

  argTypes: {
    property1: {
      options: ["default"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TickMark>;

export const Default: Story = {
  args: {
    property1: "default",
    className: {},
    propertyDefault: "/img/property-1-default-1.png",
  },
};
