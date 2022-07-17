import { render } from '@testing-library/react';

import Header from '.';

describe('<Header/>', () => {
  it('렌더링', () => {
    render(<Header />);
  });
});
