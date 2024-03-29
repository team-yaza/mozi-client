import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';
import { loginWithKakao } from '@/shared/utils/kakao';
import { getCookie } from '@/shared/utils/cookie';

const Login: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token');
    if (token) router.push('/inbox');
  }, []);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(`${process.env.KAKAO_JAVASCRIPT_KEY}`);
    }
  }, []);

  return (
    <>
      <Container>
        <Image priority src="/assets/svgs/flying_mozi.svg" width={90.84} height={123.23} alt="MOZI LOGO" />

        <KakaoLogin onClick={() => loginWithKakao()} data-testid="kakaoLogin">
          <LogoContainer>
            <Image priority src="/assets/svgs/kakao.svg" layout="fill" alt="카카오" />
          </LogoContainer>
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

const LogoContainer = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
`;

export default Login;
