import type { Meta, StoryObj } from "@storybook/react";
import { Edit } from ".";

const meta: Meta<typeof Edit> = {
  title: "Components/Edit",
  component: Edit,
};

export default meta;

type Story = StoryObj<typeof Edit>;

export const Default: Story = {
  args: {
    className: {},
    edit: "/img/edit.png",
  },
};
