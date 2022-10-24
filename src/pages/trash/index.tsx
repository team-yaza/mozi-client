import Head from 'next/head';
import type { ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { useSoftDeletedTodoList } from '@/hooks/apis/todo/useTodoListQuery';
import { Header, Spinner, TodoList, Title, AppLayout, Footer } from '@/components/common';
import { TRASH } from '@/components/common/Figure';
import {
  useDeleteAllTodosMutation,
  useForceDeleteTodoMutation,
  useUpdateTodoMutation,
  use_unsafe_createTodoMutation,
} from '@/hooks/apis/todo/useTodoMutation';

const Trash: NextPageWithLayout = () => {
  const { mutate: createTodo } = use_unsafe_createTodoMutation();
  const { data: todos, isLoading } = useSoftDeletedTodoList();
  const { mutate: forceDeleteTodo } = useForceDeleteTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteAllTodos } = useDeleteAllTodosMutation();

  return (
    <>
      <Head>
        <title>MOZI | Trash</title>
      </Head>

      <Container>
        <Header />
        <Title icon={<TRASH />} title="Trash" actionText="비우기" onClick={deleteAllTodos} />

        {isLoading && (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        )}

        <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={forceDeleteTodo} />

        <Footer createTodo={createTodo} />
      </Container>
    </>
  );
};

Trash.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;
`;

export default Trash;
