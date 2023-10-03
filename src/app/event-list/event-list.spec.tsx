import { render } from '@testing-library/react';

import EventList from './event-list';

describe('EventList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventList />);
    expect(baseElement).toBeTruthy();
  });
});
