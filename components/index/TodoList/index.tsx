import { useQuery } from 'react-query';

import { Container } from './styles';
import { Todo } from '@/shared/types/todo';
import { findAllTodos } from '@/shared/api/todoApi';
import TodoListItem from '@/components/index/TodoListItem';

const TodoList: React.FC = () => {
  const { data: todoList, isLoading } = useQuery('todoList', async () => await findAllTodos());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {todoList?.map((todo: Todo) => (
        <TodoListItem key={todo._id} todo={todo} />
      ))}
    </Container>
  );
};

export default TodoList;
