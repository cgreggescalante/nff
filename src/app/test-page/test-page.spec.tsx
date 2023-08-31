import { render } from '@testing-library/react';

import TestPage from './test-page';

describe('TestPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestPage />);
    expect(baseElement).toBeTruthy();
  });
});
