import React, { useRef, useCallback, useState, useEffect } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { useNaverMap } from '@/hooks/useNaverMap';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { CONFIRMBUTTON } from '@/components/common/Figure';
import Spinner from '@/components/common/Spinner';
import Portal from '@/components/common/Portal';
import ModalBackground from '@/components/common/ModalBackground';
import SetLocationModal from '@/components/common/SetLocationModal';
import { Container, SpinnerContainer, ConfirmContainer } from './styles';

interface MapProps {
  id: string;
  longitude?: number;
  latitude?: number;
  updateTodo: UseMutateFunction<unknown, unknown, TodoUpdateRequest, unknown>;
  setIsMapOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Map = ({ id, longitude, latitude, updateTodo, setIsMapOpened }: MapProps) => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  const { isMapLoading, markerCoords, setCoords } = useNaverMap();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (longitude && latitude) {
      setCoords({ longitude, latitude });
    }
  }, [longitude, latitude]);

  const updateLocationHandler = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, [markerCoords]);

  return (
    <Container>
      {isMapLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      {isModalOpen && (
        <Portal>
          <SetLocationModal
            id={id}
            updateTodo={updateTodo}
            setIsMapOpened={setIsMapOpened}
            setIsModalOpen={setIsModalOpen}
            longitude={markerCoords?.longitude}
            latitude={markerCoords?.latitude}
          />
          <ModalBackground setIsModalOpen={setIsModalOpen} />
        </Portal>
      )}

      {/* 네이버 지도 */}
      <div id="map" ref={naverMapRef} style={{ width: '100%', height: '30rem' }}></div>

      {/* 위치 선택 확인 버튼 */}
      {!isMapLoading && (
        <ConfirmContainer onClick={updateLocationHandler}>
          <CONFIRMBUTTON />
        </ConfirmContainer>
      )}
    </Container>
  );
};

export default Map;
