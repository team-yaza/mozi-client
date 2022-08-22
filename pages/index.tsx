import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import todoService from '@/services/apis/todo';
import { useLocationRef } from '@/hooks/location/useLocationRef';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';
import Title from '@/components/index/Title';
import TodoList from '@/components/index/TodoList';
import Header from '@/components/common/Header';
import { serializeGeoJson } from '@/shared/utils/serialize';

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { myLocationRef, updateCurrentPosition } = useLocationRef();

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await todoService.getTodos();
      setTodos(todos);
    };

    fetchTodos();
  }, []);

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

  useEffect(() => {
    const sendLocationInterval = setInterval(sendLocation, 3000);
    return () => {
      clearInterval(sendLocationInterval);
    };
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

  transition: 0.3s;
  background-color: ${({ theme }) => theme.color.background};
`;

export default Home;
