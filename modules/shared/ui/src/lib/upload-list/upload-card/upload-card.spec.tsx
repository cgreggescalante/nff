import { render } from '@testing-library/react';

import UploadCard from './upload-card';

describe('WorkoutCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UploadCard />);
    expect(baseElement).toBeTruthy();
  });
});
