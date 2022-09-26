import { ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/common/AppLayout/index';
import Title from '@/components/logbook/Title';
import TodoList from '@/components/common/TodoList/index';
import { useLogbookTodoList } from '@/hooks/apis/todo/useTodoListQuery';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';

const Logbook: NextPageWithLayout = () => {
  const { data: todos } = useLogbookTodoList();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  return (
    <Container>
      <Title />

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
