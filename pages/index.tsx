import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from '@/components/index/Header';
import TodoList from '@/components/index/TodoList';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';
import todoService from '@/services/apis/todo';
import { useLocationRef } from '@/hooks/location/useLocationRef';

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

  const onUpdateTodo = useCallback(async ({ id, title, longitude, latitude, description }: TodoUpdateRequest) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title, longitude, latitude, description } : todo))
    );

    await todoService.updateTodo({ id, title, longitude, latitude, description });
  }, []);

  const onDeleteTodo = useCallback(async (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    await todoService.deleteTodo(id);
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

  transition: 0.3s;
  background-color: ${({ theme }) => theme.color.background};
`;

export default Home;
