import { useCallback, useEffect, useState } from 'react';
import { Location } from '@/shared/types/location';

export const useNaverMap = () => {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [marker, setMarker] = useState<naver.maps.Marker>(); // 마커 정보
  const [coords, setCoords] = useState<Location>(); // 사용자의 위치
  const [markerCoords, setMarkerCoords] = useState<Location>(); // 마커의 위치

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
      setNaverMap(map);
    }
  }, [coords]);

  useEffect(() => {
    let onMapLoadedListeners: naver.maps.MapEventListener;

    const onMapLoaded = () => {
      setIsMapLoading(false);
    };

    if (naverMap) {
      onMapLoadedListeners = naver.maps.Event.addListener(naverMap, 'tilesloaded', onMapLoaded);
    }

    return () => {
      naverMap?.removeListener(onMapLoadedListeners);
    };
  }, [naverMap]);

  const createMap = useCallback((options: naver.maps.MapOptions | undefined) => new naver.maps.Map('map', options), []);
  const createMarker = useCallback((options: naver.maps.MarkerOptions) => new naver.maps.Marker(options), []);
  const createPosition = useCallback(
    (latitude: number, longitude: number) => new naver.maps.LatLng(latitude, longitude),
    []
  );

  return {
    naverMap,
    isMapLoading,
    marker,
    coords,
    markerCoords,
    setNaverMap,
    setMarker,
    setCoords,
    setMarkerCoords,
    createMap,
    createMarker,
    createPosition,
  };
};
