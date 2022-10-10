import { ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/common/AppLayout';
import Title from '@/components/setting/Title';
import Theme from '@/components/setting/Theme';

const Setting: NextPageWithLayout<{ setTheme: () => void }> = ({ setTheme }) => {
  return (
    <Container>
      <Title />
      <Theme setTheme={setTheme} />
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
