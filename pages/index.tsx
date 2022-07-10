import axios from 'axios';
import { NextPage } from 'next';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { apiClient } from '@/shared/api/apiClient';

const Home: NextPage = () => {
  // const { data: areas } = useQuery('areas', async () => apiClient.get('/area/all'));
  // const { data: projects } = useQuery('project', async () => apiClient.get('/project/all'));

  // console.log(projects);

  const [todo, setTodo] = useState('');

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

  console.log(todo);

  return (
    <Container>
      <Menu>
        {/* {areas?.data.map((area: any) => (
          <div>{area.name}</div>
        ))} */}
      </Menu>
      <Content>
        {/* {projects?.data.map((project: any) => (
          <div>{project.title}</div>
        ))} */}

        <form onSubmit={onSubmit}>
          <input value={todo} onChange={onChange} />

          <button>gogo</button>
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
