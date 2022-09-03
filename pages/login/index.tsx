import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { ReactElement, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { NextPageWithLayout } from '../_app';
import { sideBarStateAtom } from '@/store/sidebar/atom';
import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';
// import {signOut} from 'next-auth/react'

const Login: NextPageWithLayout = () => {
  const setIsSideBarOpen = useSetRecoilState(sideBarStateAtom);

  useEffect(() => {
    setIsSideBarOpen(false);
  }, []);

  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return <p>signed in as {session?.user?.email}</p>;
  }

  return (
    <Container>
      <Image src="/assets/svgs/flying_mozi.svg" width={90.84} height={123.23} />
      <KakaoLogin>
        <Image src="/assets/svgs/kakao.svg" width={30} height={30} />
        <span>카카오톡으로 로그인</span>
      </KakaoLogin>
      {/* {!session && <a href="/api/auth/signin">sign in</a>}
      {session && <div onClick={() => signOut()}>sign out</div>} */}
    </Container>
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
