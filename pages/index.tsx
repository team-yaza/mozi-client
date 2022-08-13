import { NextPage } from 'next';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Header from '@/components/index/Header';
import SideBar from '@/components/common/Sidebar';
import TodoList from '@/components/index/TodoList';
import { useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';

interface HomeProps {
  todos: Todo[];
}

const Home: NextPage<HomeProps> = ({ todos }) => {
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
        <TodoList todos={todos || []} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />
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

  background-color: ${({ theme }) => theme.color.background};
`;

export const getServerSideProps = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/v1/todos');

    if (response.status === 200) {
      return {
        props: {
          todos: response.data,
        },
      };
    }

    return {
      props: {
        todos: [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        todos: [],
      },
    };
  }
};

export default Home;
