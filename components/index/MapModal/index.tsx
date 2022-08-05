import { useCallback } from 'react';

import { useMap } from '@/hooks/useMap';
import { Container, Map, ModalWrapper, SizeBtn, ConfirmBtn } from '@/components/index/MapModal/styles';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { GeoJson } from '@/shared/types/location';

interface MapModalProps {
  id: string;
  location?: GeoJson;
  onUpdateTodo: ({ id, latitude, longitude }: TodoUpdateRequest) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapModal: React.FC<MapModalProps> = ({ id, onUpdateTodo, setIsModalOpen }) => {
  const { mapRef, markerLocation } = useMap();

  const updateLocationHandler = useCallback(() => {
    if (typeof markerLocation == 'string') return;
    onUpdateTodo({ id, latitude: markerLocation.latitude, longitude: markerLocation.longitude });
    setIsModalOpen(false);
  }, [markerLocation]);

  return (
    <Container>
      <ModalWrapper>
        <SizeBtn>+</SizeBtn>
        <Map id="map" ref={mapRef} />
        <ConfirmBtn onClick={updateLocationHandler}>V</ConfirmBtn>
      </ModalWrapper>
    </Container>
  );
};

export default MapModal;
