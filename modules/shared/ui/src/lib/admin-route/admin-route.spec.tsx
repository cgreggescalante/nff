import { render } from '@testing-library/react';

import AdminRoute from './admin-route';

describe('AdminRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminRoute />);
    expect(baseElement).toBeTruthy();
  });
});
