import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

import { GlobalStyle } from 'styles/globalStyle';
import { queryClient } from '@/shared/utils/queryClient';
import { useEffect } from 'react';
import { useLocation } from '@/hooks/useLocation';

function MyApp({ Component, pageProps }: AppProps) {
  const { myLocation, updateCurrentPosition } = useLocation();

  const alertList = [{ latitude: 30, longitude: 120, visited: false }];
  useEffect(() => {
    console.log('my: ', myLocation, 'data: ', alertList);
    const flag = alertList.filter((data) => {
      if (typeof myLocation == 'string') return false;
      if (
        Math.pow(myLocation.latitude - data.latitude, 2) + Math.pow(myLocation.longitude - data.latitude, 2) < 2500 &&
        !data.visited
      )
        return true;
    });
    if (flag) new Notification('hi');
  }, [myLocation]);

  return (
    <>
      <Head>
        <title>MOZI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
