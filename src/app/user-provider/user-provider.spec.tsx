import { render } from '@testing-library/react';

import UserProvider from './user-provider';

describe('UserProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserProvider />);
    expect(baseElement).toBeTruthy();
  });
});
