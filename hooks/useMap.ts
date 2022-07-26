import { getCurrentPosition } from '@/shared/utils/getCurrentPosition';
import { useEffect, useRef, useState } from 'react';

export const useMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [myLocation, setMyLocation] = useState<
    | {
        latitude: number;
        longitude: number;
      }
    | string
  >('');

  useEffect(() => {
    if (navigator.geolocation) {
      getCurrentPosition(setMyLocation);
    } else {
      window.alert('현재 위치를 알 수 없어 기본 위치로 지정합니다.');
      setMyLocation({ latitude: 37.4862618, longitude: 127.1222903 });
    }
  }, []);

  useEffect(() => {
    if (typeof myLocation !== 'string') {
      // 현재 위치 추적
      const currentPosition = [myLocation.latitude, myLocation.longitude];

      if (mapRef.current) {
        const map = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: true,
          minZoom: 6,
        });

        new naver.maps.Marker({
          map,
          position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        });
      }
    }
  }, [myLocation]);

  return {
    mapRef,
    myLocation,
    setMyLocation,
  };
};
