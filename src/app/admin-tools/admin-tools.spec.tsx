import { render } from '@testing-library/react';

import AdminTools from './admin-tools';

describe('AdminTools', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminTools />);
    expect(baseElement).toBeTruthy();
  });
});
