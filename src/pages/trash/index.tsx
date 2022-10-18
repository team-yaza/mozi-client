import type { ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { useSoftDeletedTodoList } from '@/hooks/apis/todo/useTodoListQuery';
import {
  useDeleteAllTodosMutation,
  useForceDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/hooks/apis/todo/useTodoMutation';
import AppLayout from '@/components/common/AppLayout';
import Title from '@/components/common/Title';
import TodoList from '@/components/common/TodoList';
import Spinner from '@/components/common/Spinner';
import { TRASH } from '@/components/common/Figure';

const Trash: NextPageWithLayout = () => {
  const { data: todos, isLoading } = useSoftDeletedTodoList();
  const { mutate: forceDeleteTodo } = useForceDeleteTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteAllTodos } = useDeleteAllTodosMutation();

  return (
    <Container>
      <Title icon={<TRASH />} title="Trash" actionText="Empty" onClick={deleteAllTodos} />

      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}

      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={forceDeleteTodo} />
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
