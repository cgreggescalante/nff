import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './footer';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'Footer',
  decorators: [
    (Story) =>
      <BrowserRouter>
        <Story />
      </BrowserRouter>
  ]
};
export default meta;
type Story = StoryObj<typeof Footer>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Footer!/gi)).toBeTruthy();
  },
};
