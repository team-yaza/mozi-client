import { fireEvent, render, screen } from '@testing-library/react';

import { Todo } from '@/shared/types/todo';
import TodoListItem from '.';

const todo: Todo = {
  _id: '1',
  title: 'Todo 1',
};

describe('<TodoListItem />', () => {
  const onDelete = jest.fn();
  const onUpdate = jest.fn();

  it('렌더링', () => {
    render(<TodoListItem todo={todo} onDeleteTodo={onDelete} onUpdateTodo={onUpdate} />);

    const todoItem = screen.getByDisplayValue(todo.title);
    expect(todoItem).toBeInTheDocument();
  });

  it('DeleteButton', () => {
    render(<TodoListItem todo={todo} onDeleteTodo={onDelete} onUpdateTodo={onUpdate} />);

    const button = screen.getByText('삭제');
    expect(onDelete).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('UpdateButton', () => {
    render(<TodoListItem todo={todo} onDeleteTodo={onDelete} onUpdateTodo={onUpdate} />);

    const input = screen.getByDisplayValue('Todo 1');

    expect(onUpdate).toHaveBeenCalledTimes(0);
    fireEvent.change(input, { target: { value: 'Todo 2' } });
    expect(onUpdate).toHaveBeenCalledTimes(1);

    const changedInputValue = screen.getByDisplayValue('Todo 2');
    expect(changedInputValue).toBeInTheDocument();
  });
});
