import type { Meta, StoryObj } from "@storybook/react";
import { Mail } from ".";

const meta: Meta<typeof Mail> = {
  title: "Components/Mail",
  component: Mail,
};

export default meta;

type Story = StoryObj<typeof Mail>;

export const Default: Story = {
  args: {
    className: {},
    mail: "/img/mail.png",
  },
};
