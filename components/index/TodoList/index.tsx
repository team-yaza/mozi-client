import { useEffect } from 'react';

import { Container } from './styles';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';
import { setItemToLocalForage } from '@/shared/utils/localForage';
import TodoListItem from '@/components/index/TodoListItem';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: ({ id, title }: TodoUpdateRequest) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo, onUpdateTodo }) => {
  useEffect(() => {
    setItemToLocalForage('todos', todos);
  }, [todos]);

  return (
    <Container>
      {todos?.map((todo: Todo) => (
        <TodoListItem
          key={todo.id}
          id={todo.id}
          _title={todo.title}
          _description={todo.description}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
          location={todo.location}
        />
      ))}
    </Container>
  );
};

export default TodoList;
