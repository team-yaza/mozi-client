import { useEffect } from 'react';

import { Container } from './styles';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';
import { setItemToLocalForage } from '@/shared/utils/localForage';
import TodoListItem from '@/components/index/TodoListItem';
import { todoStore } from '@/store/forage';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: ({ id, title }: TodoUpdateRequest) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo, onUpdateTodo }) => {
  useEffect(() => {
    todoStore.clear();
    todos.map((todo) => setItemToLocalForage(todoStore, todo.id, todo));
  }, [todos]);

  return (
    <Container>
      {todos?.map((todo: Todo) => (
        <TodoListItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />
      ))}
    </Container>
  );
};

export default TodoList;
