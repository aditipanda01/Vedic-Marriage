import type { Meta, StoryObj } from "@storybook/react";
import { ImageGallery } from ".";

const meta: Meta<typeof ImageGallery> = {
  title: "Components/ImageGallery",
  component: ImageGallery,

  argTypes: {
    property1: {
      options: ["variant-4", "variant-3"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageGallery>;

export const Default: Story = {
  args: {
    property1: "variant-4",
    className: {},
    rectangleClassName: {},
    overlapGroupClassName: {},
    groupClassName: {},
    ellipseClassName: {},
    ellipseClassNameOverride: {},
    divClassName: {},
    divClassNameOverride: {},
    ellipseClassName1: {},
  },
};
