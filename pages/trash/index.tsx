import type { ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/common/AppLayout';
import Title from '@/components/trash/Title';
import TodoList from '@/components/trash/TodoList';
import { useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';

const Trash: NextPageWithLayout = () => {
  const { data: todos } = useTodoListQuery();

  if (todos) {
    return (
      <Container>
        <Title />
        <TodoList todos={todos} />
      </Container>
    );
  }

  return <div>hi</div>;
};

Trash.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

export default Trash;
