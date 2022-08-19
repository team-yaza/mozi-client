import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Header from '@/components/index/Header';
import TodoList from '@/components/index/TodoList';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';
import todoService from '@/services/apis/todo';
import { alarmListState } from '@/store/alarm/atom';
import alarmService from '@/services/apis/alarm';
import { UpdateAlarmProps } from '@/shared/types/alarm';
import { serializeAlarmList, serializeGeoJson } from '@/shared/utils/serialize';

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [alarms, setAlarms] = useRecoilState(alarmListState);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await todoService.getTodos();
      setTodos(todos);
    };

    const fetchAlarms = async () => {
      const alarmList = await alarmService.getAlarms();
      setAlarms(serializeAlarmList(alarmList));
    };

    fetchAlarms();
    fetchTodos();
  }, []);

  // useEffect(() => {
  //   if ('serviceWorker' in navigator && 'SyncManager' in window) {
  //     navigator.serviceWorker.ready.then((registration) => {
  //       registration.sync
  //         .register('hello-sync')
  //         .then(() => {
  //           return registration.sync.getTags();
  //         })
  //         .then((tags) => {
  //           console.log(tags);
  //         });
  //     });
  //   }
  // }, []);

  const onUpdateAlarm = useCallback(({ todoId, longitude, latitude, name }: UpdateAlarmProps) => {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.todoId == todoId
          ? { ...alarm, location: serializeGeoJson(longitude, latitude, name), visited: false }
          : alarm
      )
    );
  }, []);

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
