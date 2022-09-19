import Head from 'next/head';
import { useEffect, useRef, ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { NextPageWithLayout } from '../_app';
import { useNaverMap } from '@/hooks/useNaverMap';
import { todosLocationState } from '@/store/todo/atom';
import SearchSideBar from '@/components/map/SearchSideBar';
import AppLayout from '@/components/common/AppLayout';

const Map: NextPageWithLayout = () => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  const todosLocation = useRecoilValue(todosLocationState);
  const { naverMap, createMarker, createPosition, setCoords } = useNaverMap();

  useEffect(() => {
    if (naverMap) {
      todosLocation.map((location) => {
        if (location?.coordinates) {
          const [lat, lng] = location.coordinates;
          createMarker({
            map: naverMap,
            position: createPosition(lng, lat),
            icon: {
              content: '<img class="marker" src="/assets/svgs/marker.svg" draggable="false" unselectable="on">',
              anchor: new naver.maps.Point(11, 11),
            },
          });
        }
      });
    }
  }, [todosLocation, naverMap]);

  useEffect(() => {
    const naverMapOnClickHandler = (e: any) => {
      if (naverMap) {
        createMarker({
          map: naverMap,
          position: createPosition(e.coord.y, e.coord.x),
          icon: {
            content: '<img class="marker" src="/assets/svgs/marker.svg" draggable="false" unselectable="on">',
            anchor: new naver.maps.Point(11, 11),
          },
        });
      }
    };

    if (naverMap) {
      naver.maps.Event.addListener(naverMap, 'click', naverMapOnClickHandler);
    }
  }, [naverMap]);

  return (
    <>
      <Head>
        <title>MOZI | 지도</title>
      </Head>
      <Container>
        <SearchSideBar
          // naverMap={naverMap}
          setCoords={setCoords}
          // createMarker={createMarker}
          // createPosition={createPosition}
        />
        <MapLayout id="map" ref={naverMapRef} />
      </Container>
    </>
  );
};

Map.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
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
