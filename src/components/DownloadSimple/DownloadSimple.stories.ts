import type { Meta, StoryObj } from "@storybook/react";
import { DownloadSimple } from ".";

const meta: Meta<typeof DownloadSimple> = {
  title: "Components/DownloadSimple",
  component: DownloadSimple,
};

export default meta;

type Story = StoryObj<typeof DownloadSimple>;

export const Default: Story = {
  args: {
    className: {},
    downloadSimple: "/img/downloadsimple.png",
  },
};
