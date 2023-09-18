import { render } from '@testing-library/react';

import TimedAlert from './timed-alert';

describe('TimedAlert', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TimedAlert />);
    expect(baseElement).toBeTruthy();
  });
});
