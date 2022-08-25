import { useCallback } from 'react';

import { useMap } from '@/hooks/useMap';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { GeoJson } from '@/shared/types/location';
import { Container, Map, ConfirmDiv, ConfirmSpan } from '@/components/index/MapModal/styles';
interface MapModalProps {
  id: string;
  location?: GeoJson;
  longitude?: number;
  latitude?: number;
  onUpdateTodo: ({ id, latitude, longitude }: TodoUpdateRequest) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapModal: React.FC<MapModalProps> = ({ id, onUpdateTodo, setIsModalOpen, location }) => {
  const { mapRef, markerLocation } = useMap(location);

  const updateLocationHandler = useCallback(() => {
    if (typeof markerLocation == 'string') return;
    onUpdateTodo({ id, latitude: markerLocation.latitude, longitude: markerLocation.longitude });
    setIsModalOpen(false);
  }, [markerLocation]);

  return (
    <Container>
      <Map id="map" ref={mapRef} />
      <ConfirmDiv onClick={updateLocationHandler}>
        <ConfirmSpan>확인</ConfirmSpan>
      </ConfirmDiv>
    </Container>
  );
};

export default MapModal;
