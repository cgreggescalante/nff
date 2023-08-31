import type { Meta, StoryObj } from '@storybook/react';
import { Center } from './center';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Center> = {
  component: Center,
  title: 'Center',
};
export default meta;
type Story = StoryObj<typeof Center>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Center!/gi)).toBeTruthy();
  },
};
