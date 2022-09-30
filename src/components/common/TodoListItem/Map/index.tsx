import React, { useRef, useState, useEffect } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { useNaverMap } from '@/hooks/useNaverMap';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { CONFIRMBUTTON } from '@/components/common/Figure';
import Spinner from '@/components/common/Spinner';
import Modal from '@/components/common/Modal';
import SetLocationModal from '@/components/map/SetLocationModal';
import { Container, SpinnerContainer, ConfirmContainer } from './styles';

interface MapProps {
  id: string;
  longitude?: number;
  latitude?: number;
  updateTodo: UseMutateFunction<unknown, unknown, TodoUpdateRequest, unknown>;
  setIsMapOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Map = ({ longitude, latitude }: MapProps) => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  const { isMapLoading, setCoords } = useNaverMap();
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    if (longitude && latitude) setCoords({ longitude, latitude });
  }, [longitude, latitude]);

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

        {/* 모달  */}
        <Modal
          isOpened={isModalOpened}
          onConfirm={function (): void {
            throw new Error('Function not implemented.');
          }}
          onClose={() => setIsModalOpened(false)}
        >
          ddd
        </Modal>

        <SetLocationModal />
      </Container>
    </>
  );
};

export default React.memo(Map);
