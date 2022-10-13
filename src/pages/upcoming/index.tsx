import { ReactElement } from 'react';

import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/common/AppLayout';
import styled from 'styled-components';
import Title from '@/components/upcoming/Title';
import Calendar from '@/components/upcoming/Calendar/index';

const Upcoming: NextPageWithLayout = () => {
  return (
    <Container>
      <Title />
      <Calendar />
    </Container>
  );
};

Upcoming.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;

  overflow: scroll;
`;

export default Upcoming;
