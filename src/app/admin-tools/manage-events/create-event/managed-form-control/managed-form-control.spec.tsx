import { render } from '@testing-library/react';

import ManagedFormControl from './managed-form-control';

describe('ManagedFormControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManagedFormControl />);
    expect(baseElement).toBeTruthy();
  });
});
