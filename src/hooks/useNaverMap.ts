import { useCallback, useEffect, useState } from 'react';
import { Location } from '@/shared/types/location';

export const useNaverMap = () => {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [naverMapCenter, setNaverMapCenter] = useState<naver.maps.LatLng>();
  const [coords, setCoords] = useState<Location>(); // 사용자의 현재 위치
  const [markerCoords, setMarkerCoords] = useState<Location>();

  // marker가 여러개라면?
  // const [marker, setMarker] = useState<naver.maps.Marker>();
  // const [markers, setMarkers] = useState<naver.maps.Marker[]>([]);

  const createMap = useCallback((options: naver.maps.MapOptions | undefined) => new naver.maps.Map('map', options), []);
  const createMarker = useCallback((options: naver.maps.MarkerOptions) => new naver.maps.Marker(options), []);
  const createPosition = useCallback(
    (latitude: number, longitude: number) => new naver.maps.LatLng(latitude, longitude),
    []
  );

  useEffect(() => {
    let listeners: naver.maps.MapEventListener;

    const onMapLoaded = () => {
      console.log('map loaded event');
      setIsMapLoading(false);
    };

    if (naverMap) {
      listeners = naver.maps.Event.addListener(naverMap, 'tilesloaded', onMapLoaded);
    }

    return () => {
      naver.maps.Event.removeListener(listeners);
    };
  }, [naverMap]);

  useEffect(() => {
    if (coords) {
      const center = createPosition(coords.latitude, coords.longitude);
      const map = createMap({
        center,
        zoom: 17,
        scaleControl: false,
        mapDataControl: false,
        mapTypeControl: false,
        zoomControl: false,
        logoControlOptions: {
          position: 10, // BOTTOM_LEFT = 10
        },
      });

      map.setMapTypeId(naver.maps.MapTypeId.NORMAL);
      // map.panBy(new naver.maps.Point(30, 30));
      setNaverMap(map);
      setNaverMapCenter(center);
      // setMarkerCoords(coords);
    }
  }, [coords]);

  return {
    naverMap,
    setNaverMap,
    setMarkerCoords,
    isMapLoading,
    naverMapCenter,
    coords,
    markerCoords,
    setCoords,
    createMap,
    createMarker,
    createPosition,
  };
};
