import { useEffect, useRef, useState } from 'react';
import { useLocation } from '@/hooks/location/useLocation';
import { GeoJson, Location } from '@/shared/types/location';

export const useMap = (location: GeoJson | undefined = undefined) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { myLocation } = useLocation();
  const [markerLocation, setMarkerLocation] = useState<Location | string>('');

  useEffect(() => {
    if (typeof myLocation !== 'string') {
      // 현재 위치 추적
      const currentPosition = location
        ? { lat: location.coordinates[1], lon: location.coordinates[0] }
        : { lat: myLocation.latitude, lon: myLocation.longitude };
      setMarkerLocation({ latitude: currentPosition.lat, longitude: currentPosition.lon });

      if (mapRef.current) {
        const map = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(currentPosition.lat, currentPosition.lon),
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: false,
          minZoom: 6,
        });

        const marker = new naver.maps.Marker({
          map,
          position: new naver.maps.LatLng(currentPosition.lat, currentPosition.lon),
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
