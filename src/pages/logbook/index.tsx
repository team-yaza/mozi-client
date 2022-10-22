import { ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { AppLayout, Header, Title, TodoList } from '@/components/common';
import { LOGBOOK } from '@/components/common/Figure';
import { useLogbookTodoList } from '@/hooks/apis/todo/useTodoListQuery';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';

const Logbook: NextPageWithLayout = () => {
  const { data: todos } = useLogbookTodoList();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  return (
    <Container>
      <Header />
      <Title icon={<LOGBOOK focused />} title="Logbook" />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </Container>
  );
};

Logbook.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

export default Logbook;
