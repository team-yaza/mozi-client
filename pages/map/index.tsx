import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useNaverMap } from '@/hooks/useNaverMap';
import { todosLocationState } from '@/store/todo/atom';
import SearchSideBar from '@/components/map/SearchSideBar';

const Map: NextPage = () => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  const todosLocation = useRecoilValue(todosLocationState);

  const { naverMap, createMarker, createPosition } = useNaverMap();

  useEffect(() => {
    if (naverMap) {
      todosLocation.map((location) => {
        if (location?.coordinates) {
          const [lat, lng] = location.coordinates;
          console.log(lat, lng, '왜?');
          createMarker({
            map: naverMap,
            position: createPosition(lng, lat),
          });
        }
      });
    }
  }, [todosLocation, naverMap]);

  return (
    <>
      <Head>
        <title>MOZI | 지도</title>
      </Head>
      <Container>
        <SearchSideBar />
        <MapLayout id="map" ref={naverMapRef} />
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;

  overflow-x: hidden;
`;

const MapLayout = styled.main`
  width: 100%;
  height: 100vh;
`;

export default Map;
