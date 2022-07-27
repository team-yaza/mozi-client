import type { NextPage } from 'next';
import styled from 'styled-components';

import SearchInput from '@/components/map/SearchInput';
import { useMap } from '@/hooks/useMap';
import Head from 'next/head';

const Map: NextPage = () => {
  const { mapRef, myLocation, setMyLocation } = useMap();

  return (
    <>
      <Head>
        <script
          defer
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
        ></script>
      </Head>
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
