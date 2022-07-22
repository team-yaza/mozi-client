import { NextPage } from 'next';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import Header from '@/components/index/Header';
import SideBar from '@/components/common/Sidebar';
import TodoList from '@/components/index/TodoList';
import TodoSubmitForm from '@/components/index/TodoSubmitForm';
import { findAllTodos } from '@/shared/api/todoApi';

const Home: NextPage = () => {
  const { data: todos } = useQuery('todoList', findAllTodos);

  return (
    <Container>
      <SideBar />
      <Content>
        <Header />
        <TodoList todos={todos} />
        <TodoSubmitForm />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 24rem 1fr;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export default Home;
