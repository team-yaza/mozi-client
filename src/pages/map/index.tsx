import Head from 'next/head';
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
import { CROSSHAIRS, THUMBSUP } from '@/components/common/Figure';
import { screenOut } from '@/styles/utils';
import locationService from '@/services/apis/location';

const Map: NextPageWithLayout = () => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  const [isOpenModal, setIsModalOpen] = useState(false);
  const [clickedCoords, setClickedCoords] = useState<Location>({ longitude: -1, latitude: -1 });
  const [showRecommendedLocation, setShowRecommendedLocation] = useState(false);
  const [bounds, setBounds] = useState<naver.maps.Bounds>();
  const [markers, setMarkers] = useState<Array<naver.maps.Marker>>([]);
  const { naverMap, isMapLoading, createMarker, createPosition, coords, setCoords } = useNaverMap();

  const { data: todos } = useTodoListQuery(ROUTES.MAP);
  const { mutate: createTodo } = useCreateTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  // console.log(recommendedLocation, '???');

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const createLocationTodo = useCallback(
    ({ title, locationName }: { title: string; locationName: string }) => {
      createTodo({ title, locationName, longitude: clickedCoords.longitude, latitude: clickedCoords.latitude });
    },
    [clickedCoords]
  );

  const deleteAllMarkers = () => {
    if (!naverMap) return;
    markers.forEach((marker) => marker.setMap(null));
  };

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
          'font-size: 2rem; overflow: hidden; text-overflow: ellipsis; white-space:nowrap; line-height: 3rem; z-index: 0';
        const boundary =
          '<div style=" background-color: #957AAB; border-radius: 50%; opacity: 30%; width: 100%; height:100%; "></div>';
        const boundaryBorder = `<div id="b_${todo.id}" style="visibility: hidden; position: absolute; z-index: -1; width: 30rem; height: 30rem; border: 3px solid #957AAB;border-radius: 50%;">${boundary}</div>`;
        const markerTitle = `<div id=${todo.id} style="${markerTitlestyle}"><span style="${spanStyle}">${todo.title}</span></div>`;
        const markerImg = '<img src="/assets/svgs/marker.svg" draggable="false" unselectable="on">';
        const containerStyle =
          'position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center;';
        const markerContainer = `<div style='${containerStyle}'>${markerTitle + markerImg + boundaryBorder}</div>`;
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
          if (todo.title === null || todo.title === undefined || todo.title === '') {
            toastError('Todo에 Title이 비어있습니다.');
            return;
          }
          const marker = document.getElementById(todo.id);
          const boundary = document.getElementById(`b_${todo.id}`);
          if (!marker || !boundary) return;

          if (marker.style.visibility === 'hidden') {
            marker.style.visibility = 'visible';
            boundary.style.visibility = 'visible';
            bringForward();
          } else {
            marker.style.visibility = 'hidden';
            boundary.style.visibility = 'hidden';
            sendBack();
          }
        });
        newMarkers.push(marker);
      });
      setMarkers(newMarkers);
    }
  }, [todos, naverMap]);

  useEffect(() => {
    if (showRecommendedLocation === false) {
      markers.forEach((marker) => {
        if (marker.getTitle() === '추천 장소') {
          marker.setMap(null);
        }
      });
      setMarkers(markers.filter((marker) => marker.getTitle() !== '추천 장소'));
      return;
    }

    if (naverMap && showRecommendedLocation && coords) {
      const recommendedMarkers: naver.maps.Marker[] = [];

      (async () => {
        const recommendedLocation: any = await locationService.getRecommendationResult({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        recommendedLocation.forEach((recommendedPlace: any) => {
          console.log(recommendedPlace);
          const marker = createMarker({
            title: '추천 장소',
            map: naverMap,
            position: createPosition(recommendedPlace.location[1], recommendedPlace.location[0]),
            zIndex: 1,
            icon: {
              // content: '<img class="marker" src="/assets/svgs/marker.svg" draggable="false" unselectable="on">',
              content: `<div class="marker">${recommendedPlace.name}</div>`,
              anchor: new naver.maps.Point(11, 11),
            },
          });

          recommendedMarkers.push(marker);
        });

        setMarkers((prev) => [...prev, ...recommendedMarkers]);
      })();
    }
  }, [naverMap, coords, showRecommendedLocation]);

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

  const onClickCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords({ latitude: coords.latitude, longitude: coords.longitude });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  };

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
          {isMapLoading && <Image src="/assets/images/map.png" layout="fill" alt="지도 사진" />}
          {!isMapLoading && (
            <>
              <CurrentLocation onClick={onClickCurrentLocation}>
                <LogoContainer>
                  <CROSSHAIRS />
                  <CurrentPosition>현위치</CurrentPosition>
                </LogoContainer>
              </CurrentLocation>
              <Recommend onClick={() => setShowRecommendedLocation((prev) => !prev)} data-testid="recommendButton">
                <LogoContainer>
                  <THUMBSUP />
                </LogoContainer>
              </Recommend>
            </>
          )}
        </MapLayout>

        {/* 현재 위치 */}

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
  position: relative;
  width: 100%;
  height: calc(100vh - 5.4rem);
`;

const CurrentLocation = styled.div`
  position: absolute;
  width: 3.2rem;
  height: 3.2rem;
  right: 3rem;
  bottom: 3rem;

  background-color: ${({ theme }) => theme.color.background};
  transition: background-color 0.3s;
  border-radius: 0.8rem;

  z-index: 10000;

  &:hover {
    background-color: ${({ theme }) => theme.color.purple};
  }
`;

const LogoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.color.crosshair};
    transition: fill 0.3s;
  }
`;

const CurrentPosition = styled.span`
  ${screenOut};
`;

const Recommend = styled.div`
  position: absolute;
  width: 3.2rem;
  height: 3.2rem;
  left: 3rem;
  bottom: 3rem;

  background-color: ${({ theme }) => theme.color.background};
  transition: background-color 0.3s;
  border-radius: 0.8rem;

  z-index: 10000;

  &:hover {
    background-color: ${({ theme }) => theme.color.purple};
  }

  svg {
    /* stroke: ${({ theme }) => theme.color.crosshair}; */
    color: ${({ theme }) => theme.color.crosshair};
    transition: stroke 0.3s;
  }
`;
// const RecommendContainer = styled.div``;

export default Map;
