import { useCallback, useEffect, useState } from 'react';
import { Location } from '@/shared/types/location';

export const useNaverMap = () => {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [marker, setMarker] = useState<naver.maps.Marker>(); // 마커 정보
  const [coords, setCoords] = useState<Location>(); // 사용자의 위치
  const [markerCoords, setMarkerCoords] = useState<Location>(); // 마커의 위치
  const [bounds, setBounds] = useState<naver.maps.Bounds>(); // 지도의 가장자리 좌표

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
      setBounds(map?.getBounds());
      setNaverMap(map);
    }
  }, [coords]);

  useEffect(() => {
    let onMapLoadedListeners: naver.maps.MapEventListener;
    let onMouseUpListeners: naver.maps.MapEventListener;
    let onTouchEndListeners: naver.maps.MapEventListener;

    const onMapLoaded = () => {
      setIsMapLoading(false);
    };
    const onMouseUp = () => {
      setBounds(naverMap?.getBounds());
    };

    if (naverMap) {
      onMapLoadedListeners = naver.maps.Event.addListener(naverMap, 'tilesloaded', onMapLoaded);
      onMouseUpListeners = naver.maps.Event.addListener(naverMap, 'mouseup', onMouseUp);
      onTouchEndListeners = naver.maps.Event.addListener(naverMap, 'touchend', onMouseUp);
    }

    return () => {
      naverMap?.removeListener(onMapLoadedListeners);
      naverMap?.removeListener(onMouseUpListeners);
      naverMap?.removeListener(onTouchEndListeners);
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
    bounds,
    setNaverMap,
    setMarker,
    setCoords,
    setMarkerCoords,
    createMap,
    createMarker,
    createPosition,
  };
};
