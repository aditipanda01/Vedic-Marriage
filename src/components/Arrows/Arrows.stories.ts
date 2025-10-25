import type { Meta, StoryObj } from "@storybook/react";
import { Arrows } from ".";

const meta: Meta<typeof Arrows> = {
  title: "Components/Arrows",
  component: Arrows,

  argTypes: {
    direction: {
      options: ["back"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Arrows>;

export const Default: Story = {
  args: {
    direction: "back",
    className: {},
    directionBack: "/img/direction-back.png",
  },
};
