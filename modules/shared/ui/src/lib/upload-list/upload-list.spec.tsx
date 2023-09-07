import { render } from '@testing-library/react';

import UploadList from './upload-list';

describe('UploadList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UploadList />);
    expect(baseElement).toBeTruthy();
  });
});
