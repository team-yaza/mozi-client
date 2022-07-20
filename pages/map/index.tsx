import type { NextPage } from 'next';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Map: NextPage = () => {
  console.log(process.env.NEXT_PUBLIC_MAP_KEY);
  console.log(process.env.NEXT_PUBLIC_NAVER_CLIENT_ID);

  const mapRef = useRef<HTMLElement | null | any>(null);
  const [myLocation, setMyLocation] = useState<
    | {
        latitude: number;
        longitude: number;
      }
    | string
  >('');

  useEffect(() => {
    // geolocation 이용 현재 위치 확인, 위치 미동의 시 기본 위치로 지정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      window.alert('현재 위치를 알 수 없어 기본 위치로 지정합니다.');
      setMyLocation({ latitude: 37.4862618, longitude: 127.1222903 });
    }
  }, []);

  useEffect(() => {
    if (typeof myLocation !== 'string') {
      mapRef.current = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(myLocation.latitude, myLocation.longitude),
        zoomControl: true,
      });
    }
  }, [mapRef, myLocation]);

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
      ></Script>
      <MapLayout id="map" />
    </>
  );
};

const MapLayout = styled.div`
  width: 800rem;
  height: 80rem;
`;

export default Map;
