import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { findAllTodo } from '@/shared/api/todoAPI';

interface Todo {
  title: string;
}

const Home: NextPage = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      const response = await findAllTodo();
      setTodoList(response);
    })();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:3001/api/v1/todo/create', {
      title: todo,
    });

    if (response.status === 200) {
      setTodo('');
    } else {
      console.log('에러남.');
    }

    alert('저장되었습니다.');
  };

  return (
    <Container>
      <Menu></Menu>
      <Content>
        {todoList?.map((todo: Todo) => (
          <p>{todo.title}</p>
        ))}
        <form onSubmit={onSubmit}>
          <input value={todo} onChange={onChange} />

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
