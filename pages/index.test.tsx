import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';

import Home from '@/pages/index';
import { queryClient } from '@/shared/utils/queryClient';

describe('<HomePage/>', () => {
  test('렌더링', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Home />
        </RecoilRoot>
      </QueryClientProvider>
    );
  });
});
