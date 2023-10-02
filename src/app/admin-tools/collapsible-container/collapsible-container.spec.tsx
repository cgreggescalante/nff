import { render } from '@testing-library/react';

import CollapsibleContainer from './collapsible-container';

describe('CollapsibleContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CollapsibleContainer />);
    expect(baseElement).toBeTruthy();
  });
});
