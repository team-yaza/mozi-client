import React, { useRef, useCallback, useState } from 'react';

import { useNaverMap } from '@/hooks/useNaverMap';
import { Container, SpinnerContainer, ConfirmDiv, ConfirmSpan } from './styles';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { UseMutateFunction } from '@tanstack/react-query';
import Spinner from '@/components/common/Spinner';
import Portal from '@/components/common/Portal';
import ModalBackground from '@/components/common/ModalBackground/index';
import SetLocationModal from '@/components/common/SetLocationModal';

interface MapProps {
  id: string;
  longitude?: number;
  latitude?: number;
  updateTodo: UseMutateFunction<any, unknown, TodoUpdateRequest, unknown>;
}

const Map = ({ id, longitude, latitude, updateTodo }: MapProps) => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  const location = longitude && latitude ? { longitude, latitude } : undefined;
  const { isMapLoading, markerCoords } = useNaverMap(location);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateLocationHandler = useCallback(() => {
    setIsModalOpen((old) => !old);
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
            setIsModalOpen={setIsModalOpen}
            longitude={markerCoords?.longitude}
            latitude={markerCoords?.latitude}
          />
          <ModalBackground setIsModalOpen={setIsModalOpen} />
        </Portal>
      )}
      <div id="map" ref={naverMapRef} style={{ width: '100%', height: '30rem' }}></div>
      <ConfirmDiv>
        <ConfirmSpan onClick={updateLocationHandler}>확인</ConfirmSpan>
      </ConfirmDiv>
    </Container>
  );
};

export default Map;
