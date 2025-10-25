import type { Meta, StoryObj } from "@storybook/react";
import { DropdownTriangle } from ".";

const meta: Meta<typeof DropdownTriangle> = {
  title: "Components/DropdownTriangle",
  component: DropdownTriangle,
};

export default meta;

type Story = StoryObj<typeof DropdownTriangle>;

export const Default: Story = {
  args: {
    className: {},
    polygonClassName: {},
    polygon: "/img/polygon-1.png",
  },
};
