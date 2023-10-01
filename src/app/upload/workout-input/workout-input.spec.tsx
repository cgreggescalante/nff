import { render } from '@testing-library/react';

import { WorkoutInput } from './workout-input';

describe('WorkoutInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WorkoutInput />);
    expect(baseElement).toBeTruthy();
  });
});
