import React, { useRef, useState, useEffect, useCallback } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { useNaverMap } from '@/hooks/useNaverMap';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { CONFIRMBUTTON } from '@/components/common/Figure';
import Spinner from '@/components/common/Spinner';
import SetLocationModal from '@/components/map/SetLocationModal';
import { Container, SpinnerContainer, ConfirmContainer } from './styles';

interface MapProps {
  id: string;
  longitude?: number;
  latitude?: number;
  updateTodo: UseMutateFunction<unknown, unknown, TodoUpdateRequest, unknown>;
  setIsMapOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Map: React.FC<MapProps> = ({ id, longitude, latitude, updateTodo }) => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  const { naverMap, coords, isMapLoading, markerCoords, setCoords, setMarkerCoords, createMarker, createPosition } =
    useNaverMap();
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    if (markerCoords) {
      setMarkerCoords({ longitude: markerCoords.longitude, latitude: markerCoords.latitude });
      return;
    }

    if (longitude && latitude) setCoords({ longitude, latitude });
  }, [longitude, latitude]);

  useEffect(() => {
    if (latitude && longitude) {
      setCoords({ longitude, latitude });
      return;
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setCoords({ latitude: coords.latitude, longitude: coords.longitude });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    if (markerCoords) {
      updateTodo({
        id,
        longitude: markerCoords.longitude,
        latitude: markerCoords.latitude,
      });
    }
  }, [markerCoords]);

  useEffect(() => {
    let mapEventListeners: naver.maps.MapEventListener;
    let marker: naver.maps.Marker;

    if (naverMap) {
      if (latitude && longitude) {
        marker = createMarker({
          map: naverMap,
          position: createPosition(latitude, longitude),
          icon: {
            content: '<img class="marker" src="/assets/svgs/marker.svg" draggable="false" unselectable="on">',
            anchor: new naver.maps.Point(11, 11),
          },
        });
      } else if (coords) {
        marker = createMarker({
          map: naverMap,
          position: createPosition(coords.latitude, coords.longitude),
          icon: {
            content: '<img class="marker" src="/assets/svgs/marker.svg" draggable="false" unselectable="on">',
            anchor: new naver.maps.Point(11, 11),
          },
        });
      }
      mapEventListeners = naver.maps.Event.addListener(naverMap, 'click', (e) => {
        marker?.setPosition(e.coord);
        setMarkerCoords({ longitude: e.coord.x, latitude: e.coord.y });
      });
    }

    return () => {
      naver.maps.Event.removeListener(mapEventListeners);
    };
  }, [naverMap, coords]);

  const updateLocationName = useCallback((locationName: string) => {
    updateTodo({ id, locationName });
  }, []);

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
          <ConfirmContainer onClick={() => setIsModalOpened(true)}>
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
