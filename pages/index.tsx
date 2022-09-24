import { ReactElement, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { useLocationRef } from '@/hooks/location/useLocationRef';
import { useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import Header from '@/components/common/Header';
import Title from '@/components/index/Title';
import TodoList from '@/components/index/TodoList';
import Footer from '@/components/common/Footer';
import AppLayout from '@/components/common/AppLayout';
import { useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';

const Home: NextPageWithLayout = () => {
  const { data: todos } = useTodoListQuery();
  const { mutate: createTodo } = useCreateTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const { myLocationRef, updateCurrentPosition } = useLocationRef();

  useEffect(() => {
    const sendLocationInterval = setInterval(sendLocation, 3000);
    return () => {
      clearInterval(sendLocationInterval);
    };
  }, [myLocationRef]);

  const sendLocation = useCallback(() => {
    if (!navigator.serviceWorker.controller) return;
    if (!myLocationRef.current) return;
    updateCurrentPosition();
    navigator.serviceWorker.controller.postMessage({
      type: 'SET_INTERVAL',
      latitude: myLocationRef.current.latitude,
      longitude: myLocationRef.current.longitude,
    });
  }, [myLocationRef]);

  return (
    <Container>
      <Header />
      <Title onCreate={createTodo} />
      <TodoList todos={todos || []} onDeleteTodo={deleteTodo} onUpdateTodo={updateTodo} />
      <Footer />
    </Container>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;

  margin: 0 auto;

  transition: 0.3s;
  background-color: ${({ theme }) => theme.color.background};
`;

export default Home;
