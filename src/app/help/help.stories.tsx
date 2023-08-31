import type { Meta, StoryObj } from '@storybook/react';
import { Help } from './help';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Help> = {
  component: Help,
  title: 'Help',
};
export default meta;
type Story = StoryObj<typeof Help>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Help!/gi)).toBeTruthy();
  },
};
