import type { Meta, StoryObj } from "@storybook/react";
import { Delete } from ".";

const meta: Meta<typeof Delete> = {
  title: "Components/Delete",
  component: Delete,
};

export default meta;

type Story = StoryObj<typeof Delete>;

export const Default: Story = {
  args: {
    className: {},
    img: "/img/delete.png",
  },
};
