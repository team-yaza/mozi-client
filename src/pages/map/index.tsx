import Image from 'next/image';
import { useEffect, useRef, ReactElement, useState, useCallback } from 'react';
import styled from 'styled-components';

import { useDeleteTodoMutation, useUpdateTodoMutation, useCreateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';
import { toastError } from '@/shared/utils/toast';
import { NextPageWithLayout } from '@/pages/_app';
import SearchSideBar from '@/components/map/SearchSideBar';
import SetLocationModal from '@/components/map/SetLocationModal';
import { AppLayout, Header } from '@/components/common';
import { Todo } from '@/shared/types/todo';
import { Location } from '@/shared/types/location';
import { useNaverMap } from '@/hooks/useNaverMap';
import { useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import { ROUTES } from '@/shared/constants/routes';

const Map: NextPageWithLayout = () => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  const [isOpenModal, setIsModalOpen] = useState<boolean>(false);
  const [clickedCoords, setClickedCoords] = useState<Location>({ longitude: -1, latitude: -1 });
  const [bounds, setBounds] = useState<naver.maps.Bounds>();
  const [markers, setMarkers] = useState<Array<naver.maps.Marker>>([]);
  const { naverMap, isMapLoading, createMarker, createPosition, setCoords } = useNaverMap();

  const { data: todos } = useTodoListQuery(ROUTES.MAP);
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

  const deleteAllMarkers = useCallback(() => {
    if (!naverMap) return;
    console.log('delete all markers');
    markers.forEach((marker) => marker.setMap(null));
  }, [markers]);

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
      deleteAllMarkers();
      const newMarkers: naver.maps.Marker[] = [];
      todos.forEach((todo: Todo) => {
        const markerTitlestyle =
          'position: absolute; bottom: 4.5rem;' +
          'background-color: #FFFFFF; visibility:hidden; padding-inline: 1rem;' +
          'display:flex; justify-content: center; align-items: center; height: 3.5rem;' +
          'border: 1px #735AFF solid; border-radius: 3rem; max-width: 20rem;';
        const spanStyle =
          'font-size: 2rem; overflow: hidden; text-overflow: ellipsis; white-space:nowrap; line-height: 3rem;';
        const markerTitle = `<div id=${todo.id} style="${markerTitlestyle}"><span style="${spanStyle}">${todo.title}</span></div>`;
        const markerImg = '<img class="marker" src="/assets/svgs/marker.svg" draggable="false" unselectable="on">';
        const containerStyle =
          'position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center;';
        const markerContainer = `<div style='${containerStyle}'>${markerTitle + markerImg}</div>`;
        const marker = createMarker({
          map: naverMap,
          position: createPosition(todo.latitude as number, todo.longitude as number),
          zIndex: 1,
          icon: {
            content: markerContainer,
            anchor: new naver.maps.Point(11, 11),
          },
        });
        const sendBack = () => {
          marker.setZIndex(0);
        };
        const bringForward = () => {
          marker.setZIndex(100);
        };
        marker.addListener('click', () => {
          if (todo.title === null || todo.title === undefined) {
            toastError('Todo에 Title이 비어있습니다.');
            return;
          }
          const marker = document.getElementById(todo.id);
          if (!marker) return;

          if (marker.style.visibility === 'hidden') {
            marker.style.visibility = 'visible';
            bringForward();
          } else {
            marker.style.visibility = 'hidden';
            sendBack();
          }
        });
        newMarkers.push(marker);
      });
      setMarkers(newMarkers);
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
      {/* <SEO title="MOZI | Map" /> */}
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

  background-color: ${({ theme }) => theme.color.background};
  transition: background-color 0.3s;
`;

const MapLayout = styled.main`
  width: 100%;
  height: calc(100vh - 5.4rem);
`;

export default Map;
