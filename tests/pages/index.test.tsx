import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import Home from 'pages/index';

describe('HomePage', () => {
  test('렌더링', () => {
    render(
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    );
  });
});
