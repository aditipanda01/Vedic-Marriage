import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from ".";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,

  argTypes: {
    state: {
      options: ["on"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    state: "on",
    className: {},
    stateOn: "/img/state-on.png",
  },
};
