import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Todo } from '@/shared/types/todo';
import TodoListItem from '.';

const todo: Todo = {
  id: '1',
  title: 'Todo',
  done: false,
  alarmed: false,
};

describe('<TodoListItem />', () => {
  const onDelete = jest.fn();
  const onUpdate = jest.fn();

  it.skip('렌더링', async () => {
    const { container } = render(
      <TodoListItem id={todo.id} title={todo.title} onDeleteTodo={onDelete} onUpdateTodo={onUpdate} done={false} />
    );

    expect(container).toBeInTheDocument();
  });

  // 테스트 수정 필요
  it.skip('Delete Todo', () => {
    render(
      <TodoListItem id={todo.id} title={todo.title} onDeleteTodo={onDelete} onUpdateTodo={onUpdate} done={false} />
    );

    const button = screen.getByText('삭제');
    expect(onDelete).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it.skip('Update Title', async () => {
    // Arrange
    const { container } = render(
      <TodoListItem id={todo.id} title={todo.title} onDeleteTodo={onDelete} onUpdateTodo={onUpdate} done={false} />
    );
    // const $div = screen.getByText('Todo');
    // Act
    await userEvent.click(container);
    await userEvent.type(container, 'Todo');
    // Assert

    // const changedInputValue = await screen.findByText('TodoTodo');

    // expect(changedInputValue).toBeInTheDocument();
  });
});
