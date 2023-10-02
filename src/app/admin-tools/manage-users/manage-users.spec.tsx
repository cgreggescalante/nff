import { render } from '@testing-library/react';

import ManageUsers from './manage-users';

describe('ManageUsers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManageUsers />);
    expect(baseElement).toBeTruthy();
  });
});
