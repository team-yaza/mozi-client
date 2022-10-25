import Head from 'next/head';
import Image from 'next/image';
import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';
import { loginWithKakao } from '@/shared/utils/kakao';

const Login: NextPageWithLayout = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(`${process.env.KAKAO_JAVASCRIPT_KEY}`);
    }
  }, []);

  return (
    <>
      <Head>
        <title>MOZI | Login</title>
      </Head>
      <Container>
        <Image src="/assets/svgs/flying_mozi.svg" width={90.84} height={123.23} />

        <KakaoLogin onClick={() => loginWithKakao()}>
          <Image src="/assets/svgs/kakao.svg" width={30} height={30} />
          <span>카카오톡으로 로그인</span>
        </KakaoLogin>
      </Container>
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

const LoginLayout = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  height: 100%;

  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  ${flexCenter};
  flex-direction: column;

  background-color: ${theme.colors.main};
`;

const KakaoLogin = styled.div`
  width: 34rem;
  height: 5rem;
  ${flexCenter};

  margin-top: 4rem;
  border-radius: 1rem;

  background-color: ${theme.colors.kakao};

  cursor: pointer;

  span {
    margin-left: 1rem;
    font-size: 1.3rem;
  }
`;

export default Login;
