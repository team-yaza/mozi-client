import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { AppLayout, Header, Title } from '@/components/common';
import { NEXTARROW, PREVARROW, UPCOMING } from '@/components/common/Figure';
import { getYearAndMonth } from '@/shared/utils/date';

const Upcoming: NextPageWithLayout = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <Container>
      <Header />
      <Title icon={<UPCOMING />} title="Upcoming">
        <Navigator>
          <ArrowContainer
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          >
            <PREVARROW />
          </ArrowContainer>
          {getYearAndMonth(currentDate)}
          <ArrowContainer
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          >
            <NEXTARROW />
          </ArrowContainer>
        </Navigator>
      </Title>
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

const Navigator = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  font-size: 2rem;
  font-weight: bold;
  margin-left: auto;
  margin-right: -1.5rem;

  cursor: default;

  color: ${({ theme }) => theme.color.white};
  transition: color 0.3s;
`;

const ArrowContainer = styled.div`
  position: relative;
  width: 2rem;

  margin-inline: 2rem;

  cursor: pointer;

  stroke: ${({ theme }) => theme.color.icon};
  transition: stroke 0.3s;
`;

export default Upcoming;
