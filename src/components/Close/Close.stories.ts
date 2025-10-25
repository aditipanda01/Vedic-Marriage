import type { Meta, StoryObj } from "@storybook/react";
import { Close } from ".";

const meta: Meta<typeof Close> = {
  title: "Components/Close",
  component: Close,
};

export default meta;

type Story = StoryObj<typeof Close>;

export const Default: Story = {
  args: {
    className: {},
    close: "/img/close.png",
  },
};
