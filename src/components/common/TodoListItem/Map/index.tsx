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
  const { isMapLoading, setCoords } = useNaverMap();
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    if (longitude && latitude) setCoords({ longitude, latitude });
  }, [longitude, latitude]);

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
          id={id}
          isOpened={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          updateLocationName={updateLocationName}
        />
      </Container>
    </>
  );
};

export default React.memo(Map);
