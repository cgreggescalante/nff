import type { Meta, StoryObj } from '@storybook/react';
import { UploadCard } from "./upload-card";

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { WorkoutType } from "@shared-data";

const meta: Meta<typeof UploadCard> = {
  component: UploadCard,
  title: 'WorkoutCard',
};
export default meta;
type Story = StoryObj<typeof UploadCard>;

export const Primary = {
  args: {
    upload: {
      user: {
        firstName: "Dave",
        lastName: "Borgor",
        id: 10
      },
      date: new Date(),
      workouts: [
        {
          workoutType: WorkoutType.Run,
          duration: 10,
          points: 10
        },
        {
          workoutType: WorkoutType.Bike,
          duration: 25,
          points: 6.25
        }
      ],
      points: 16.25
    }
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to WorkoutCard!/gi)).toBeTruthy();
  },
};
