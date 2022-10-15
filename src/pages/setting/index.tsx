import { ReactElement } from 'react';
import styled from 'styled-components';
// import { useRouter } from 'next/router';

import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/common/AppLayout';
import Title from '@/components/setting/Title';
import Theme from '@/components/setting/Theme';
// import Button from '@/components/common/Button/index';

const Setting: NextPageWithLayout<{ setTheme: () => void }> = ({ setTheme }) => {
  // const router = useRouter();

  return (
    <Container>
      <Title />
      <Theme setTheme={setTheme} />
      {/* <LogoutButton color="primary" size="large">
        로그아웃
      </LogoutButton> */}
    </Container>
  );
};

Setting.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

// const LogoutButton = styled(Button)``;

export default Setting;
