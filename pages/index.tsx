import { NextPage } from 'next';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import Header from '@/components/index/Header';
import SideBar from '@/components/common/Sidebar';
import TodoList from '@/components/index/TodoList';
import { useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import { useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';
import { TodoUpdateRequest } from '@/shared/types/todo';

const Home: NextPage = () => {
  const { data: todoList, isLoading } = useTodoListQuery();
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

  // if (isLoading) return <div>로딩중</div>;

  return (
    <Container>
      <SideBar onClose={onSideBarClose} />
      <Content>
        <Header onCreate={onCreateTodo} />
        <TodoList todos={todoList || []} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  overflow: hidden;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 auto;
`;

export default Home;
