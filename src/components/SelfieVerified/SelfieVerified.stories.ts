import type { Meta, StoryObj } from "@storybook/react";
import { SelfieVerified } from ".";

const meta: Meta<typeof SelfieVerified> = {
  title: "Components/SelfieVerified",
  component: SelfieVerified,

  argTypes: {
    property1: {
      options: ["default"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelfieVerified>;

export const Default: Story = {
  args: {
    property1: "default",
    className: {},
    propertyDefault: "/img/property-1-default.png",
  },
};
