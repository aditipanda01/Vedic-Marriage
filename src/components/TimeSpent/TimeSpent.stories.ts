import type { Meta, StoryObj } from "@storybook/react";
import { TimeSpent } from ".";

const meta: Meta<typeof TimeSpent> = {
  title: "Components/TimeSpent",
  component: TimeSpent,
};

export default meta;

type Story = StoryObj<typeof TimeSpent>;

export const Default: Story = {
  args: {
    className: {},
    timeSpent: "/img/timespent.png",
  },
};
