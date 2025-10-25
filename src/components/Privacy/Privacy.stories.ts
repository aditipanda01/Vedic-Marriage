import type { Meta, StoryObj } from "@storybook/react";
import { Privacy } from ".";

const meta: Meta<typeof Privacy> = {
  title: "Components/Privacy",
  component: Privacy,
};

export default meta;

type Story = StoryObj<typeof Privacy>;

export const Default: Story = {
  args: {
    className: {},
    privacy: "/img/privacy.png",
  },
};
