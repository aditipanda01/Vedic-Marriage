import type { Meta, StoryObj } from "@storybook/react";
import { Notification } from ".";

const meta: Meta<typeof Notification> = {
  title: "Components/Notification",
  component: Notification,

  argTypes: {
    property1: {
      options: ["no-notification"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {
    property1: "no-notification",
    className: {},
    propertyNo: "/img/property-1-no-notification.png",
  },
};
