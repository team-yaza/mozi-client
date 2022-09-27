import { useRef, useCallback } from 'react';

import { useNaverMap } from '@/hooks/useNaverMap';
import { Container, SpinnerContainer, ConfirmDiv, ConfirmSpan } from './styles';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { UseMutateFunction } from '@tanstack/react-query';
import Spinner from '@/components/common/Spinner';

interface MapProps {
  id: string;
  longitude?: number;
  latitude?: number;
  onClickMap: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  updateTodo: UseMutateFunction<any, unknown, TodoUpdateRequest, unknown>;
}

const Map = ({ id, longitude, latitude, onClickMap, updateTodo }: MapProps) => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  const location = longitude && latitude ? { longitude, latitude } : undefined;
  const { isMapLoading, markerCoords } = useNaverMap(location);

  const updateLocationHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      console.log('marker', markerCoords);
      updateTodo({ id, longitude: markerCoords?.longitude, latitude: markerCoords?.latitude });
      onClickMap(e);
    },
    [markerCoords]
  );

  return (
    <Container>
      {isMapLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      <div id="map" ref={naverMapRef} style={{ width: '100%', height: '30rem' }}></div>
      <ConfirmDiv>
        <ConfirmSpan onClick={updateLocationHandler}>확인</ConfirmSpan>
      </ConfirmDiv>
    </Container>
  );
};

export default Map;
