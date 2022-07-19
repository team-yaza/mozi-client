import { NextPage } from 'next';
import styled from 'styled-components';

import SideBar from '@/components/common/SideBar';
import TodoList from '@/components/index/TodoList';
import TodoSubmitForm from '@/components/index/TodoSubmitForm';
import Header from '@/components/index/Header';

const Home: NextPage = () => {
  return (
    <Container>
      <SideBar />
      <Content>
        <Header />
        <TodoList />
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
