import { ReactElement } from 'react';

import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/common/AppLayout';
import styled from 'styled-components';
import Title from '@/components/today/Title';

const Today: NextPageWithLayout = () => {
  return (
    <Container>
      <Title />
    </Container>
  );
};

Today.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

export default Today;