import { useEffect, useRef, useState } from 'react';
import { useLocation } from '@/hooks/location/useLocation';
import { Location } from '@/shared/types/location';

export const useMap = ({ latitude, longitude }: { latitude?: number; longitude?: number }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { myLocation } = useLocation();
  const [markerLocation, setMarkerLocation] = useState<Location | string>('');

  useEffect(() => {
    if (typeof myLocation !== 'string') {
      // 현재 위치 추적
      const currentPosition =
        latitude && longitude
          ? { latitude, longitude }
          : { latitude: myLocation.latitude, longitude: myLocation.longitude };
      setMarkerLocation({ latitude: currentPosition.latitude, longitude: currentPosition.longitude });

      if (mapRef.current) {
        const map = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: false,
          minZoom: 6,
        });

        const marker = new naver.maps.Marker({
          map,
          position: new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
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
