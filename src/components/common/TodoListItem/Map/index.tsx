import React, { useRef, useState, useEffect, useCallback } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useNaverMap } from '@/hooks/useNaverMap';
import { CONFIRMBUTTON } from '@/components/common/Figure';
import Spinner from '@/components/common/Spinner';
import SetLocationModal from '@/components/common/SetLocationModal';
import { Container, SpinnerContainer, ConfirmContainer } from './styles';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';

interface MapProps {
  todo: Todo;
  updateTodo: UseMutateFunction<Partial<Todo>, AxiosError, TodoUpdateRequest>;
}

const Map: React.FC<MapProps> = ({ todo, updateTodo }) => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  const { naverMap, isMapLoading, coords, markerCoords, setMarkerCoords, setCoords, createMarker, createPosition } =
    useNaverMap();
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    if (todo.longitude && todo.latitude) setCoords({ longitude: todo.longitude, latitude: todo.latitude });
    else {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setCoords({ latitude: coords.latitude, longitude: coords.longitude });
          setMarkerCoords({ latitude: coords.latitude, longitude: coords.longitude });
        },
        (error) => console.error(error)
      );
    }
  }, [todo, setCoords]);

  useEffect(() => {
    if (naverMap && coords) {
      const marker = createMarker({
        map: naverMap,
        position: createPosition(coords.latitude, coords.longitude),
        icon: {
          content: '<img src="/assets/svgs/marker.svg" draggable="false" unselectable="on">',
          anchor: new naver.maps.Point(11, 11),
        },
      });

      naver.maps.Event.addListener(naverMap, 'click', (e: any) => {
        marker?.setPosition(e.coord);
        setMarkerCoords({ longitude: e.coord.x, latitude: e.coord.y });
      });
    }
  }, [naverMap, coords, createMarker, createPosition, setMarkerCoords]);

  const updateLocationName = useCallback(
    (locationName: string) => {
      updateTodo({ ...todo, locationName, latitude: markerCoords?.latitude, longitude: markerCoords?.longitude });
    },
    [todo, markerCoords, updateTodo]
  );

  return (
    <>
      <Container>
        {isMapLoading && (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        )}

        {/* 네이버 지도 */}
        <div id="map" ref={naverMapRef} style={{ width: '100%', height: '30rem' }}></div>

        {/* 위치 선택 확인 버튼 */}
        {!isMapLoading && (
          <ConfirmContainer onClick={() => setIsModalOpened(true)} data-testid="mapCheckButton">
            <CONFIRMBUTTON />
          </ConfirmContainer>
        )}

        {/* 장소 이름을 입력하는 모달  */}
        <SetLocationModal
          isOpened={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          updateLocationName={updateLocationName}
        />
      </Container>
    </>
  );
};

export default React.memo(Map);
