import { useMap } from '@/hooks/useMap';
import { Modal, Map } from '@/components/index/MapModal/styles';
import SearchInput from '@/components/map/SearchInput';

export const MapModal = () => {
  const { mapRef } = useMap();

  return (
    <Modal>
      <SearchInput />
      <Map id="map" ref={mapRef} />
    </Modal>
  );
};
