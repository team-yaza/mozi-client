import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, ReactElement, useState, useCallback } from 'react';
import styled from 'styled-components';

import { useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';
import { NextPageWithLayout } from '@/pages/_app';
import SearchSideBar from '@/components/map/SearchSideBar';
import SetLocationModal from '@/components/map/SetLocationModal';
import { AppLayout, Header } from '@/components/common';
import { Todo } from '@/shared/types/todo';
import { Location } from '@/shared/types/location';
import { useNaverMap } from '@/hooks/useNaverMap';
import { useMapTodoList } from '@/hooks/apis/todo/useTodoListQuery';

const Map: NextPageWithLayout = () => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  const [isOpenModal, setIsModalOpen] = useState<boolean>(false);
  const [clickedCoords, setClickedCoords] = useState<Location>({ longitude: -1, latitude: -1 });
  const [bounds, setBounds] = useState<naver.maps.Bounds>(); // 지도의 가장자리 오브젝트
  const { naverMap, isMapLoading, createMarker, createPosition, setCoords } = useNaverMap();

  const { data: todos } = useMapTodoList();
  const { mutate: createTodo } = useCreateTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const createLocationTodo = useCallback(
    ({ title, locationName }: { title: string; locationName: string }) => {
      createTodo({ title, locationName, longitude: clickedCoords.longitude, latitude: clickedCoords.latitude });
    },
    [clickedCoords]
  );

  useEffect(() => {
    if (!naverMap) return;

    const onMouseUp = () => {
      setBounds(naverMap.getBounds());
    };

    const onMouseUpListeners = naver.maps.Event.addListener(naverMap, 'mouseup', onMouseUp);
    const onTouchEndListeners = naver.maps.Event.addListener(naverMap, 'touchend', onMouseUp);
    setBounds(naverMap.getBounds());

    return () => {
      if (!naverMap) return;
      naverMap.removeListener(onMouseUpListeners);
      naverMap.removeListener(onTouchEndListeners);
    };
  }, [naverMap]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords({ latitude: coords.latitude, longitude: coords.longitude });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  }, [setCoords]);

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
      setClickedCoords({ longitude: e.coord.x, latitude: e.coord.y });
      setIsModalOpen(true);
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
        <SearchSideBar
          setCoords={setCoords}
          todos={todos?.filter((todo) => bounds?.hasPoint({ x: todo.longitude as number, y: todo.latitude as number }))}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />

        {/* Header 영역 */}
        <Header />

        {/* Map 영역 */}
        <MapLayout id="map" ref={naverMapRef}>
          {isMapLoading && <Image src="/assets/images/map.png" layout="fill" />}
        </MapLayout>

        {/* 모달 */}
        {isOpenModal && <SetLocationModal isOpened={isOpenModal} onClose={onClose} createTodo={createLocationTodo} />}
      </Container>
    </>
  );
};

Map.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  overflow-x: hidden;
`;

const MapLayout = styled.main`
  width: 100%;
  height: calc(100vh - 5.4rem);
`;

export default Map;
