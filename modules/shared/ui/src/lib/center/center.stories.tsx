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
  args: {
    children: <div style={{ backgroundColor: "lightgrey" }}>
      <h1>This is some content!!</h1>
      <table>
        <thead>
        <tr>
          <th>Meat</th>
          <th>Cheese</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Yes!</td>
          <td>Yes!</td>
        </tr>
        </tbody>
      </table>
    </div>
  },
};

export const Heading: Story = {
  args: {}
};
