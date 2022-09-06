import { ReactElement, useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { NextPageWithLayout } from './_app';
import todoService from '@/services/apis/todo';
import { useLocationRef } from '@/hooks/location/useLocationRef';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';
import { serializeGeoJson } from '@/shared/utils/serialize';
import { todosState } from '@/store/todo/atom';
import Header from '@/components/common/Header';
import Title from '@/components/index/Title';
import TodoList from '@/components/index/TodoList';
import Footer from '@/components/common/Footer';
import AppLayout from '@/components/common/AppLayout';
import { useSession } from 'next-auth/react';

const Home: NextPageWithLayout = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  const { myLocationRef, updateCurrentPosition } = useLocationRef();
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session?.user, '세션 값');
  }, [session]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await todoService.getTodos();
      setTodos(todos);
    };

    fetchTodos();
  }, []);

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

  const onCreateTodo = useCallback(async () => {
    const createdTodo = await todoService.createTodo();

    setTodos((prev) => [...prev, createdTodo]);
  }, []);

  const onUpdateTodo = useCallback(async ({ id, title, longitude, latitude, description, done }: TodoUpdateRequest) => {
    setTodos(
      (prev) =>
        prev.map((todo) => {
          const location = longitude && latitude ? serializeGeoJson(longitude, latitude, '충남대학교') : todo.location;
          return todo.id === id
            ? {
                ...todo,
                title,
                location,
                description,
                done,
                alarmed: false,
              }
            : todo;
        }) as Todo[]
    );
    await todoService.updateTodo({ id, title, longitude, latitude, description, done });
  }, []);

  const onDeleteTodo = useCallback(async (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    await todoService.deleteTodo(id);
  }, []);

  return (
    <Container>
      <Header />
      <Title onCreate={onCreateTodo} />
      <TodoList todos={todos || []} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />
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
