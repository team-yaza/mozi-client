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
  it('렌더링시에 todo 목록을 보여줘야한다.', () => {
    render(
      <TodoList
        todos={todos}
        onUpdateTodo={function ({ id, title }: { id: string; title: string }): void {
          throw new Error('Function not implemented.');
        }}
        onDeleteTodo={function (id: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    );

    const todo1 = screen.getByText('Todo 1');
    const todo2 = screen.getByText('Todo 2');

    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
  });
});
