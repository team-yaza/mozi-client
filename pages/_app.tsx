import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

import { GlobalStyle } from '@/styles/globalStyle';
import { queryClient } from '@/shared/utils/queryClient';
import { urlBase64ToUint8Array } from '@/shared/utils/encryption';
import webPushService from '@/services/apis/webpush';

const publicVapidKey = 'BHCoqzR03UrjuAFGPoTDB5t6o05z5K3EYJ1cuZVj9sPF6FxNsS-b7y4ClNaS11L9EUpmT-wUyeZAivwGbkwMAjY';

function MyApp({ Component, pageProps }: AppProps) {
  const subscribeEvent = useCallback(async () => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const serviceWorker = await navigator.serviceWorker.ready;

      const sub = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });
      await webPushService.notification(JSON.stringify(sub));
    }
  }, []);

  useEffect(() => {
    subscribeEvent();
  }, []);

  return (
    <>
      <Head>
        <title>MOZI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
      </Head>
      <Script
        defer
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
      ></Script>
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
