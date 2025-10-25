import type { Meta, StoryObj } from "@storybook/react";
import { Phone } from ".";

const meta: Meta<typeof Phone> = {
  title: "Components/Phone",
  component: Phone,
};

export default meta;

type Story = StoryObj<typeof Phone>;

export const Default: Story = {
  args: {
    className: {},
    phone: "/img/phone.png",
  },
};
