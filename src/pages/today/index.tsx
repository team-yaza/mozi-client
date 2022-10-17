import { ReactElement } from 'react';

import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/common/AppLayout';
import styled from 'styled-components';
import Title from '@/components/common/Title';
import TODAY from '@/components/common/Figure/TODAY';

const Today: NextPageWithLayout = () => {
  return (
    <Container>
      <Title icon={<TODAY focused />} title="Today" />
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
