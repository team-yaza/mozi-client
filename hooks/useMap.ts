import { useEffect, useRef, useState } from 'react';

function useMap() {
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
      // 현재 위치 추적
      const currentPosition = [myLocation.latitude, myLocation.longitude];

      // Naver Map 생성
      // mapRef.current = new naver.maps.Map('map', {
      //   center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
      //   zoomControl: true,
      // });
    }
  }, [myLocation]);

  return {
    myLocation,
  };
}

export default useMap;
