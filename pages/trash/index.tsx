import type { ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { useSoftDeletedTodoList, useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import {
  useDeleteAllTodosMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/hooks/apis/todo/useTodoMutation';
import AppLayout from '@/components/common/AppLayout';
import Title from '@/components/trash/Title';
import TodoList from '@/components/trash/TodoList';
import Spinner from '@/components/common/Spinner';

const Trash: NextPageWithLayout = () => {
  const { data: todos, isLoading } = useTodoListQuery();
  // 테스트중
  const { data: softDeletedTodos } = useSoftDeletedTodoList();
  const { mutate: deleteTodo } = useDeleteTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteAllTodos } = useDeleteAllTodosMutation();

  console.log(softDeletedTodos, 'softDeletedTodos');

  return (
    <Container>
      <Title onEmptyButtonClick={deleteAllTodos} />

      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}

      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </Container>
  );
};

Trash.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;
`;

export default Trash;
