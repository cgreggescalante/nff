import { render } from '@testing-library/react';

import EditUserDetails from './edit-user-details';

describe('EditUserDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditUserDetails />);
    expect(baseElement).toBeTruthy();
  });
});
