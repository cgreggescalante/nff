import { render } from '@testing-library/react';

import UserDashboard from './user-dashboard';

describe('UserDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
