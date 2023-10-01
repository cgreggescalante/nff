import { render } from '@testing-library/react';

import LoadingWrapper from './loading-wrapper';

describe('LoadingWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoadingWrapper />);
    expect(baseElement).toBeTruthy();
  });
});
