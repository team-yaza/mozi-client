import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import SearchSideBar from '@/components/map/SearchSideBar';
import AppLayout from '@/components/common/AppLayout';
import { Todo } from '@/shared/types/todo';
import { useNaverMap } from '@/hooks/useNaverMap';
import { useMapTodoList } from '@/hooks/apis/todo/useTodoListQuery';

const Map: NextPageWithLayout = () => {
  const naverMapRef = useRef<HTMLDivElement>(null);

  const { data: todos } = useMapTodoList();
  const { naverMap, isMapLoading, createMarker, createPosition, setCoords } = useNaverMap();

  useEffect(() => {
    if (naverMap && todos) {
      todos.forEach((todo: Todo) => {
        createMarker({
          map: naverMap,
          position: createPosition(todo.latitude as number, todo.longitude as number),
          icon: {
            content: '<img class="marker" src="/assets/svgs/marker.svg" draggable="false" unselectable="on">',
            anchor: new naver.maps.Point(11, 11),
          },
        });
      });
    }
  }, [todos, naverMap]);

  useEffect(() => {
    let eventListeners: naver.maps.MapEventListener;

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
      eventListeners = naver.maps.Event.addListener(naverMap, 'click', naverMapOnClickHandler);
    }

    return () => {
      naver.maps.Event.removeListener(eventListeners);
    };
  }, [naverMap]);

  return (
    <>
      <Head>
        <title>MOZI | Map</title>
      </Head>
      <Container>
        {/* 검색 사이드바 */}
        <SearchSideBar setCoords={setCoords} />

        {/* Map 영역 */}
        {isMapLoading && <Image src="/assets/images/map.png" layout="fill" />}
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
