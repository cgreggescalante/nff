import { render } from '@testing-library/react';

import Help from './help';

describe('Help', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Help />);
    expect(baseElement).toBeTruthy();
  });
});
