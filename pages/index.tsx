import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

import { findAllTodo, createTodo } from '@/shared/api/todoAPI';

interface Todo {
  _id: string;
  title: string;
}

const Home: NextPage = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const todoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getAllTodo();
  }, []);

  const getAllTodo = useCallback(async () => {
    const response = await findAllTodo();
    setTodoList(response as Todo[]);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = todoInputRef.current?.value;
    if (!title) return;

    const response = await createTodo(title);
    if (response) {
      todoInputRef.current.value = '';
      getAllTodo();
    }
  };

  const onDeleteTodo = async (id: string) => {
    const response = await axios.delete(`http://localhost:3001/api/v1/todo?todoId=${id}`);

    if (response.status === 200) {
      setTodoList(todoList.filter((todo) => todo._id !== id));
    } else {
      console.log('에러남.');
    }
  };

  return (
    <Container>
      <Menu></Menu>
      <Content>
        {todoList?.map((todo: Todo) => (
          <div key={todo._id}>
            <p>{todo.title}</p>
            <button onClick={() => onDeleteTodo(todo._id)}>삭제</button>
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <input ref={todoInputRef} />
          <button>Add</button>
        </form>
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
