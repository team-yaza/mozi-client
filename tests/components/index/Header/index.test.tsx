import { render } from '@testing-library/react';

import Header from '@/components/index/Header';

describe('<Header/>', () => {
  it('렌더링', () => {
    render(<Header />);
  });
});
