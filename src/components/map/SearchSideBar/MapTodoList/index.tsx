import { UseMutateFunction } from '@tanstack/react-query';

import { Container, Header } from './styles';
import {
  Todo,
  // TodoUpdateRequest
} from '@/shared/types/todo';
import TodoList from '@/components/common/TodoList';

interface MapTodoListProps {
  todos?: Todo[];
  updateTodo: UseMutateFunction<unknown, unknown, unknown, unknown>;
  deleteTodo: UseMutateFunction<unknown, unknown, string, unknown>;
}

const MapTodoList = ({ todos, updateTodo, deleteTodo }: MapTodoListProps) => {
  return (
    <Container>
      <Header>Todo List</Header>
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </Container>
  );
};

export default MapTodoList;
