import { useEffect, useRef, useState } from 'react';
import { useLocation } from '@/hooks/location/useLocation';
import { Location } from '@/shared/types/location';

export const useMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { myLocation } = useLocation();
  const [markerLocation, setMarkerLocation] = useState<Location | string>('');

  useEffect(() => {
    if (typeof myLocation !== 'string') {
      // 현재 위치 추적
      const currentPosition = [myLocation.latitude, myLocation.longitude];
      setMarkerLocation({ latitude: myLocation.latitude, longitude: myLocation.longitude });

      if (mapRef.current) {
        const map = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: false,
          minZoom: 6,
        });

        const marker = new naver.maps.Marker({
          map,
          position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        });

        naver.maps.Event.addListener(map, 'click', function (e) {
          marker.setPosition(e.coord);
          setMarkerLocation({ latitude: e.coord.y, longitude: e.coord.x });
        });
      }
    }
  }, [myLocation]);

  return {
    mapRef,
    myLocation,
    markerLocation,
  };
};
