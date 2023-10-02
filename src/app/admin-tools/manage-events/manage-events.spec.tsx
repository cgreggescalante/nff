import { render } from '@testing-library/react';

import MangeEvents from './manage-events';

describe('MangeEvents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MangeEvents />);
    expect(baseElement).toBeTruthy();
  });
});
