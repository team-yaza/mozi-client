import styled from 'styled-components';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';
import AppLayout from '@/components/common/AppLayout/index';

const Logbook: NextPageWithLayout = () => {
  return <Container>hi</Container>;
};

Logbook.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div``;

export default Logbook;
