import { render } from '@testing-library/react';

import ConfirmDelete from './confirm-delete';

describe('ConfirmDelete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConfirmDelete />);
    expect(baseElement).toBeTruthy();
  });
});
