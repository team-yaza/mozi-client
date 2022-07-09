import TestComponent from 'components/TestComponent';
import { NextPage } from 'next';
import styled from 'styled-components';

const Home: NextPage = () => {
  return (
    <Container>
      Next.js
      <TestComponent />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
`;

export default Home;
