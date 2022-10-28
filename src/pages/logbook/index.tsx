import Head from 'next/head';
import { ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { AppLayout, Footer, Header, Title, TodoList } from '@/components/common';
import { LOGBOOK } from '@/components/common/Figure';
import { useLogbookTodoList } from '@/hooks/apis/todo/useTodoListQuery';
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  use_unsafe_createTodoMutation,
} from '@/hooks/apis/todo/useTodoMutation';

const Logbook: NextPageWithLayout = () => {
  const { data: todos } = useLogbookTodoList();
  const { mutate: createTodo } = use_unsafe_createTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  return (
    <>
      <Head>
        <title>MOZI | Logbook</title>
      </Head>
      <Container>
        <Header />
        <Title icon={<LOGBOOK focused />} title="Logbook" />
        <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        <Footer createTodo={createTodo} />
      </Container>
    </>
  );
};

Logbook.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.color.background};
  transition: background-color 0.3s;
`;

export default Logbook;
