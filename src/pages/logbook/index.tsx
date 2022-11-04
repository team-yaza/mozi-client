import Head from 'next/head';
import { ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { AppLayout, Footer, Header, Title, TodoList } from '@/components/common';
import { LOGBOOK } from '@/components/common/Figure';
import { useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import {
  use_unsafe_deleteTodoMutation,
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from '@/hooks/apis/todo/useTodoMutation';
import { ROUTES } from '@/shared/constants/routes';

const Logbook: NextPageWithLayout = () => {
  const { data: todos } = useTodoListQuery(ROUTES.LOGBOOK);
  const { mutate: createTodo } = useCreateTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = use_unsafe_deleteTodoMutation();

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
