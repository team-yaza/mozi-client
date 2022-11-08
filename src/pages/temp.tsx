import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import Navigator from '@/components/upcoming/Navigator';
import { NextPageWithLayout } from '@/pages/_app';
import { AppLayout, Header, Title } from '@/components/common';
import { UPCOMING } from '@/components/common/Figure';
import CalendarHeader from '@/components/upcoming/CalendarHeader';

const Upcoming: NextPageWithLayout = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <Container>
      <Header />
      <Title icon={<UPCOMING />} title="Upcoming">
        <Navigator currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </Title>
      <CalendarHeader />
    </Container>
  );
};

Upcoming.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.color.background};
  transition: background-color 0.3s;
`;

export default Upcoming;
