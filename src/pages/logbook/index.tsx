import { ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { AppLayout, Footer, Header, SEO, Title, TodoList } from '@/components/common';
import { LOGBOOK } from '@/components/common/Figure';
import { useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import { useDeleteTodoMutation, useCreateTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';
import { ROUTES } from '@/shared/constants/routes';

const Logbook: NextPageWithLayout = () => {
  const { data: todos } = useTodoListQuery(ROUTES.LOGBOOK);
  const { mutate: createTodo } = useCreateTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  return (
    <>
      <SEO title="MOZI | Logbook" />
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
