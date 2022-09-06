import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';
import { useRouter } from 'next/router';

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);

  return (
    <Container>
      <Image src="/assets/svgs/flying_mozi.svg" width={90.84} height={123.23} />

      <KakaoLogin onClick={async () => signIn('kakao')}>
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
