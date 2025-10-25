import type { Meta, StoryObj } from "@storybook/react";
import { PropertyNoWrapper } from ".";

const meta: Meta<typeof PropertyNoWrapper> = {
  title: "Components/PropertyNoWrapper",
  component: PropertyNoWrapper,

  argTypes: {
    property1: {
      options: ["no-notification"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PropertyNoWrapper>;

export const Default: Story = {
  args: {
    property1: "no-notification",
    className: {},
    propertyNo: "/img/property-1-no-notification.png",
  },
};
