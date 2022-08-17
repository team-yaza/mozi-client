import { NextPage } from 'next';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Header from '@/components/index/Header';
import TodoList from '@/components/index/TodoList';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { todoListState } from '@/store/todo/atom';
import todoService from '@/services/apis/todo';

const Home: NextPage = () => {
  const [todos, setTodos] = useRecoilState(todoListState);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await todoService.getTodos();
      // console.log(todos);
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  const onCreateTodo = useCallback(async () => {
    const createdTodo = await todoService.createTodo();

    setTodos((prev) => [...prev, createdTodo]);
  }, []);

  const onUpdateTodo = useCallback(async ({ id, title, longitude, latitude, description }: TodoUpdateRequest) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title, longitude, latitude, description } : todo))
    );
    console.log('updatetodo실행');
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
