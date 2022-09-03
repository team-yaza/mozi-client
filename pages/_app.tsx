/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { useState, useCallback, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import styled, { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '@/styles/globalStyle';
import { queryClient } from '@/shared/utils/queryClient';
import { darkTheme, lightTheme } from '@/styles/theme';
import { SessionProvider } from 'next-auth/react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const [theme, setTheme] = useState('light');
  const getLayout = Component.getLayout ?? ((page) => page);

  const handleTheme = useCallback(() => {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
  }, [theme]);

  return (
    <>
      <Head>
        <title>MOZI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
      </Head>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <SessionProvider session={session}>
              <Suspense fallback={<div>Loading</div>}>{getLayout(<Component {...pageProps} />)}</Suspense>
            </SessionProvider>
            <ModeButton onClick={handleTheme} />
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

const ModeButton = styled.div`
  position: absolute;
  width: 5rem;
  height: 5rem;

  bottom: 2rem;
  left: 2rem;

  background-color: blue;
  border-radius: 50%;

  cursor: pointer;
`;

export default MyApp;
