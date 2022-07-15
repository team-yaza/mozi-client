import { NextPage } from 'next';
import styled from 'styled-components';

import TodoSubmitForm from '@/components/index/TodoSubmitForm';
import TodoList from '@/components/index/TodoList';
import SideBar from '@/components/sidebar';

const Home: NextPage = () => {
  return (
    <Container>
      <SideBar />
      <Content>
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
`;

export default Home;
