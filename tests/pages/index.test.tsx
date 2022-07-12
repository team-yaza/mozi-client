import { render } from '@testing-library/react';
import Home from 'pages/index';

describe('HomePage', () => {
  test('렌더링', () => {
    render(<Home />);
  });
});
