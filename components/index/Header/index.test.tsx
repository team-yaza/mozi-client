import { render } from '@/shared/utils/testUtils';

import Header from '@/components/index/Header';

describe('<Header/>', () => {
  const onCreate = jest.fn();

  it('렌더링', () => {
    render(<Header onCreate={onCreate} />);
  });
});
