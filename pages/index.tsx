import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from '@/components/index/Header';
import TodoList from '@/components/index/TodoList';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';
import todoService from '@/services/apis/todo';
import alarmService from '@/services/apis/alarm';
import { Alarm, UpdateAlarmProps } from '@/shared/types/alarm';
import { serializeAlarmList, serializeGeoJson } from '@/shared/utils/serialize';
import { useLocationRef } from '@/hooks/location/useLocationRef';
import { alarmStore } from '@/store/forage';

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { myLocationRef, updateCurrentPosition } = useLocationRef();

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await todoService.getTodos();
      setTodos(todos);
    };

    const fetchAlarms = async () => {
      const alarmList = serializeAlarmList(await alarmService.getAlarms());
      await alarmStore.clear();

      if (!alarmList) return;
      Promise.all(
        alarmList.map(async (alarm: Alarm) => {
          await alarmStore.setItem(`${alarm.todoId}`, alarm);
        })
      );
    };

    fetchAlarms();
    fetchTodos();
  }, []);

  const sendLocation = () => {
    if (!navigator.serviceWorker.controller) return;
    if (!myLocationRef.current) return;
    updateCurrentPosition();
    navigator.serviceWorker.controller.postMessage({
      type: 'SET_INTERVAL',
      latitude: myLocationRef.current.longitude,
      longitude: myLocationRef.current.longitude,
    });
  };

  useEffect(() => {
    const sendLocationInterval = setInterval(sendLocation, 3000);
    return () => {
      clearInterval(sendLocationInterval);
    };
  }, [myLocationRef]);

  const onUpdateAlarm = useCallback(async ({ todoId, longitude, latitude, name }: UpdateAlarmProps) => {
    const alarmTemp: Alarm | null = await alarmStore.getItem(todoId);
    if (!alarmTemp) return;
    alarmStore.setItem(todoId, { ...alarmTemp, location: serializeGeoJson(longitude, latitude, name) });
  }, []);

  const onCreateTodo = useCallback(async () => {
    const createdTodo = await todoService.createTodo();

    setTodos((prev) => [...prev, createdTodo]);
  }, []);

  const onUpdateTodo = useCallback(async ({ id, title, longitude, latitude, description }: TodoUpdateRequest) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id == id && !todo.location?.name && longitude != undefined && latitude != undefined)
          alarmStore.setItem(id, {
            todoId: id,
            location: serializeGeoJson(longitude, latitude, '충남대학교'),
            visited: false,
          });
        return todo.id === id ? { ...todo, title, longitude, latitude, description } : todo;
      })
    );

    await todoService.updateTodo({ id, title, longitude, latitude, description });
  }, []);

  const onDeleteTodo = useCallback(async (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    await alarmStore.removeItem(id);

    await todoService.deleteTodo(id);
  }, []);

  const onSideBarClose = useCallback(() => {
    // console.log('SideBar가 닫힙니다.');
  }, []);

  return (
    <Container>
      <Header onCreate={onCreateTodo} />
      <TodoList
        todos={todos || []}
        onDeleteTodo={onDeleteTodo}
        onUpdateTodo={onUpdateTodo}
        onUpdateAlarm={onUpdateAlarm}
      />
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
