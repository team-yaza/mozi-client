import { render } from '@/shared/utils/testUtils';

import Title from '@/components/index/Title';

describe('<Title/>', () => {
  const onCreate = jest.fn();

  it('렌더링', () => {
    render(<Title onCreate={onCreate} />);
  });
});
