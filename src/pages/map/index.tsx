import Head from 'next/head';
import { useEffect, useRef, ReactElement } from 'react';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { useNaverMap } from '@/hooks/useNaverMap';
import SearchSideBar from '@/components/map/SearchSideBar';
import AppLayout from '@/components/common/AppLayout';
import { useMapTodoList } from '@/hooks/apis/todo/useTodoListQuery';
import { Todo } from '@/shared/types/todo';
import Image from 'next/image';

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
