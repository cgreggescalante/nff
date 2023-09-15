import { render } from '@testing-library/react';

import { WorkoutInput } from "@shared-ui";

describe('WorkoutInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WorkoutInput />);
    expect(baseElement).toBeTruthy();
  });
});
