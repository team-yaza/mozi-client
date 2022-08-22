import { render } from '@testing-library/react';

import TodoList from '.';
import { Todo } from '@/shared/types/todo';

const todos: Todo[] = [
  {
    id: '1',
    title: 'Todo 1',
    alarmed: false,
  },
  {
    id: '2',
    title: 'Todo 2',
    alarmed: false,
  },
];

describe('<TodoList />', () => {
  const onUpdateTodo = jest.fn();
  const onDeleteTodo = jest.fn();

  it('렌더링시에 todo 목록을 보여줘야한다.', () => {
    const { container } = render(<TodoList todos={todos} onUpdateTodo={onUpdateTodo} onDeleteTodo={onDeleteTodo} />);

    expect(container).toBeInTheDocument();
  });
});
