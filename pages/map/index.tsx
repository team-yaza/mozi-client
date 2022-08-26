import type { NextPage } from 'next';
import styled from 'styled-components';

import SearchInput from '@/components/map/SearchInput';
import { useMap } from '@/hooks/useMap';

const Map: NextPage = () => {
  const { mapRef } = useMap();

  return (
    <Container>
      <SearchInput />
      <MapLayout id="map" ref={mapRef} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

const MapLayout = styled.div`
  width: 100%;
  height: 100vh;
`;

export default Map;
