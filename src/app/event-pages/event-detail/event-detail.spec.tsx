import { render } from '@testing-library/react';

import EventDetail from './event-detail';

describe('EventDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventDetail />);
    expect(baseElement).toBeTruthy();
  });
});
