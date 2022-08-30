import type { NextPage } from 'next';
import styled from 'styled-components';

import SearchSideBar from '@/components/map/SearchSideBar';
import { useMap } from '@/hooks/useMap';

const Map: NextPage = () => {
  const { mapRef } = useMap();

  return (
    <Container>
      <SearchSideBar />
      <MapLayout id="map" ref={mapRef} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;

  overflow-x: hidden;
`;

const MapLayout = styled.div`
  width: 100%;
  height: 100vh;
`;

export default Map;
