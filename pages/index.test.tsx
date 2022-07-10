import { render } from '@testing-library/react';
import Home from './index';

describe('HomePage', () => {
  test('렌더링', () => {
    render(<Home />);
  });
});
