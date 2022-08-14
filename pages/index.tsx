import { NextPage } from 'next';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import Header from '@/components/index/Header';
import TodoList from '@/components/index/TodoList';
import { useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import { useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';
import { TodoUpdateRequest } from '@/shared/types/todo';

const Home: NextPage = () => {
  const { data: todos } = useTodoListQuery();
  const createTodoMutation = useCreateTodoMutation();
  const updateTodoMutation = useUpdateTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();

  useEffect(() => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage('cache-current-page');
    }
  }, []);

  const onCreateTodo = useCallback(() => {
    createTodoMutation.mutate();
  }, []);

  const onUpdateTodo = useCallback(({ id, title, longitude, latitude, description }: TodoUpdateRequest) => {
    updateTodoMutation.mutate({ id, title, latitude, longitude, description });
  }, []);

  const onDeleteTodo = useCallback((id: string) => {
    deleteTodoMutation.mutate(id);
  }, []);

  const onSideBarClose = useCallback(() => {
    // console.log('SideBar가 닫힙니다.');
  }, []);

  return (
    <Container>
      <Header onCreate={onCreateTodo} />
      <TodoList todos={todos || []} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;

  margin: 0 auto;

  background-color: ${({ theme }) => theme.color.background};
`;

export default Home;
