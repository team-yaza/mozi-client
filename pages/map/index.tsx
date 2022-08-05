import type { NextPage } from 'next';
import styled from 'styled-components';

import SearchInput from '@/components/map/SearchInput';
import { useMap } from '@/hooks/useMap';

const Map: NextPage = () => {
  const { mapRef } = useMap({});

  return (
    <>
      <SearchInput />
      <MapLayout id="map" ref={mapRef} />
    </>
  );
};

const MapLayout = styled.div`
  width: 100%;
  height: 100%;
`;

export default Map;
