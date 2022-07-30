import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

import { GlobalStyle } from 'styles/globalStyle';
import { queryClient } from '@/shared/utils/queryClient';
import { Location } from '@/shared/types/location';
import { useLocationRef } from '@/hooks/location/useLocationRef';
import { getDistance } from '@/shared/utils/getDistance';

function MyApp({ Component, pageProps }: AppProps) {
  const { myLocationRef, updateCurrentPosition } = useLocationRef();

  const alarmQueue = [{ latitude: 36.36777, longitude: 127.34149999 }];
  const waitingQueue: Array<Location> = [];

  const alarmHandler = () => {
    if (!myLocationRef.current) return;
    alarmQueue.forEach((location: Location, index: number) => {
      console.log(
        getDistance(
          myLocationRef.current.latitude,
          myLocationRef.current.longitude,
          location.latitude,
          location.longitude
        )
      );
      if (
        getDistance(
          myLocationRef.current.latitude,
          myLocationRef.current.longitude,
          location.latitude,
          location.longitude
        ) < 100000 //100 km 설정
      ) {
        new Notification(`${location.latitude} : ${location.longitude}`);
        const alarmLocation = alarmQueue.splice(index, 1);
        waitingQueue.push(alarmLocation[0]);
      }
    });
    console.log('now: ', myLocationRef.current.latitude, myLocationRef.current.longitude);
    console.log('alarm: ', alarmQueue);
    console.log('wait: ', waitingQueue);
    updateCurrentPosition();
  };

  useEffect(() => {
    const c = setInterval(alarmHandler, 1000);
    return () => {
      clearInterval(c);
    };
  }, []);

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
