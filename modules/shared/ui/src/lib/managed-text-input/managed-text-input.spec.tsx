import { render } from '@testing-library/react';

import ManagedTextInput from './managed-text-input';

describe('ManagedTextInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManagedTextInput />);
    expect(baseElement).toBeTruthy();
  });
});
