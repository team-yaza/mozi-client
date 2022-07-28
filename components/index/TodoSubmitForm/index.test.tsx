import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '@/shared/utils/queryClient';
import TodoSubmitForm from '@/components/index/TodoSubmitForm';

describe('<TodoSubmitForm />', () => {
  it('렌더링', () => {
    render(
      // 나중에 빼줘야함 모든 테스트 코드에 감쌀 수 없음!
      <QueryClientProvider client={queryClient}>
        <TodoSubmitForm />
      </QueryClientProvider>
    );

    const addText = screen.getByText('Add');
    expect(addText).toBeInTheDocument();
  });
});
