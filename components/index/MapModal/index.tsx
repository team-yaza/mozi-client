import { useCallback, useEffect } from 'react';

import { useMap } from '@/hooks/useMap';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { GeoJson } from '@/shared/types/location';
import { Container, Map, SizeBtn, ConfirmBtn } from '@/components/index/MapModal/styles';
import { UpdateAlarmProps } from '@/shared/types/alarm';
interface MapModalProps {
  id: string;
  location?: GeoJson;
  longitude?: number;
  latitude?: number;
  onUpdateTodo: ({ id, latitude, longitude }: TodoUpdateRequest) => void;
  onUpdateAlarm: ({ todoId, longitude, latitude, name, visited }: UpdateAlarmProps) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapModal: React.FC<MapModalProps> = ({ id, onUpdateTodo, setIsModalOpen, onUpdateAlarm, location }) => {
  const { mapRef, markerLocation } = useMap(location);

  const updateLocationHandler = useCallback(() => {
    if (typeof markerLocation == 'string') return;
    onUpdateTodo({ id, latitude: markerLocation.latitude, longitude: markerLocation.longitude });
    onUpdateAlarm({
      todoId: id,
      latitude: markerLocation.latitude,
      longitude: markerLocation.longitude,
      name: '충남대학교',
      visited: false,
    });
    setIsModalOpen(false);
  }, [markerLocation]);

  return (
    <Container>
      <SizeBtn>+</SizeBtn>
      <Map id="map" ref={mapRef} />
      <ConfirmBtn onClick={updateLocationHandler}>V</ConfirmBtn>
    </Container>
  );
};

export default MapModal;
