import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Todo } from '@/shared/types/todo';
import TodoListItem from '.';

const todo: Todo = {
  id: '1',
  title: 'Todo',
};

describe('<TodoListItem />', () => {
  const onDelete = jest.fn();
  const onUpdate = jest.fn();

  it('렌더링', async () => {
    render(<TodoListItem id={todo.id} _title={todo.title} onDeleteTodo={onDelete} onUpdateTodo={onUpdate} />);

    const todoItem = screen.getByText(todo.title);
    expect(todoItem).toBeInTheDocument();
  });

  it('Delete Todo', () => {
    render(<TodoListItem id={todo.id} _title={todo.title} onDeleteTodo={onDelete} onUpdateTodo={onUpdate} />);

    const button = screen.getByText('삭제');
    expect(onDelete).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('Update Title', async () => {
    // Arrange
    render(<TodoListItem id={todo.id} _title={todo.title} onDeleteTodo={onDelete} onUpdateTodo={onUpdate} />);
    const $div = screen.getByText('Todo');
    // Act
    await userEvent.click($div);
    await userEvent.type($div, 'Todo');
    // Assert
    const changedInputValue = screen.getByText('TodoTodo');
    expect(changedInputValue).toBeInTheDocument();
  });
});
