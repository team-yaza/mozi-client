import { ReactElement } from 'react';

import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/common/AppLayout';
import styled from 'styled-components';
import Title from '@/components/setting/Title';

const Setting: NextPageWithLayout = () => {
  return (
    <Container>
      <Title />
    </Container>
  );
};

Setting.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

export default Setting;
