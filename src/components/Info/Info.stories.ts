import type { Meta, StoryObj } from "@storybook/react";
import { Info } from ".";

const meta: Meta<typeof Info> = {
  title: "Components/Info",
  component: Info,
};

export default meta;

type Story = StoryObj<typeof Info>;

export const Default: Story = {
  args: {
    className: {},
    info: "/img/info-21.png",
  },
};
