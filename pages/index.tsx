import { apiClient } from '@/shared/api/apiClient';
import { NextPage } from 'next';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const Home: NextPage = () => {
  const { data: areas } = useQuery('areas', async () => apiClient.get('/area/all'));
  const { data: projects } = useQuery('project', async () => apiClient.get('/project/all'));

  console.log(projects);

  return (
    <Container>
      <Menu>
        {areas?.data.map((area: any) => (
          <div>{area.name}</div>
        ))}
      </Menu>
      <Content>
        {projects?.data.map((project: any) => (
          <div>{project.title}</div>
        ))}
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
