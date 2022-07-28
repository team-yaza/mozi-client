import { render, screen } from '@testing-library/react';

import TodoList from '.';
import { Todo } from '@/shared/types/todo';

const todos: Todo[] = [
  {
    _id: '1',
    title: 'Todo 1',
  },
  {
    _id: '2',
    title: 'Todo 2',
  },
];

describe('<TodoList />', () => {
  const onUpdateTodo = jest.fn();
  const onDeleteTodo = jest.fn();

  it('렌더링시에 todo 목록을 보여줘야한다.', () => {
    render(<TodoList todos={todos} onUpdateTodo={onUpdateTodo} onDeleteTodo={onDeleteTodo} />);

    const todo1 = screen.getByDisplayValue('Todo 1');
    const todo2 = screen.getByDisplayValue('Todo 2');

    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
  });
});
