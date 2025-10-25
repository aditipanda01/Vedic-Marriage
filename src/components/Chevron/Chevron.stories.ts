import type { Meta, StoryObj } from "@storybook/react";
import { Chevron } from ".";

const meta: Meta<typeof Chevron> = {
  title: "Components/Chevron",
  component: Chevron,

  argTypes: {
    property1: {
      options: ["up", "down"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chevron>;

export const Default: Story = {
  args: {
    property1: "up",
    className: {},
    propertyUp: "/img/property-1-up.png",
    propertyDown: "/img/property-1-down.png",
  },
};
