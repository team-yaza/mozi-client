import type { NextPage } from 'next';
import Script from 'next/script';
import styled from 'styled-components';

import SearchInput from '@/components/map/SearchInput';
import useMap from '@/hooks/useMap';

const Map: NextPage = () => {
  const { mapRef, myLocation, setMyLocation } = useMap();

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
      ></Script>
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
