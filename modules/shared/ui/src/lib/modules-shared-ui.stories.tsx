import type { Meta, StoryObj } from '@storybook/react';
import { ModulesSharedUi } from './modules-shared-ui';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ModulesSharedUi> = {
  component: ModulesSharedUi,
  title: 'ModulesSharedUi',
};
export default meta;
type Story = StoryObj<typeof ModulesSharedUi>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ModulesSharedUi!/gi)).toBeTruthy();
  },
};
