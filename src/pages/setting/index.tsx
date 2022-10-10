import { ReactElement } from 'react';

import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/common/AppLayout';
import styled, { useTheme } from 'styled-components';
import Title from '@/components/setting/Title';
import Theme from '@/components/setting/Theme';

const Setting: NextPageWithLayout = () => {
  const theme = useTheme();
  console.log(theme);

  return (
    <Container>
      <Title />
      <Theme />
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
