import type { ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import AppLayout from '@/components/common/AppLayout';
import Title from '@/components/trash/Title';
import TodoList from '@/components/trash/TodoList';
import Spinner from '@/components/common/Spinner';

const Trash: NextPageWithLayout = () => {
  const { data: todos, isLoading } = useTodoListQuery();

  return (
    <Container>
      <Title />

      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}

      <TodoList todos={todos} />
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
