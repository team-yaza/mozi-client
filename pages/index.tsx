import { NextPage } from 'next';
import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

import { findAllTodo, createTodo, deleteTodo } from '@/shared/api/todoAPI';
import TodoSubmitForm from '@/components/index/TodoSubmitForm';
import TodoList from '@/components/index/TodoList';
import { Todo } from '@/shared/types/todo';

const Home: NextPage = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    getAllTodo();
  }, []);

  const getAllTodo = useCallback(async () => {
    try {
      const todos = await findAllTodo();
      setTodoList(todos);
    } catch (error) {
      // !TODO 토스트 팝업
      alert('투두를 가져오지 못했습니다.');
    }
  }, []);

  const onDeleteTodo = useCallback(async (todoId: string) => {
    try {
      await deleteTodo(todoId);
    } catch (error: any) {
      alert(error.message);
    }

    getAllTodo();
  }, []);

  return (
    <Container>
      <Menu></Menu>
      <Content>
        <TodoList todoList={todoList} onDeleteTodo={onDeleteTodo} />
        <TodoSubmitForm setTodoList={setTodoList} />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 24rem 1fr;
`;

const Menu = styled.div`
  width: 100%;
  height: 100%;

  font-size: 5rem;

  background-color: #f7f6f3;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

export default Home;
