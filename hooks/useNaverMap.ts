import { useCallback, useEffect, useState } from 'react';

export const useNaverMap = () => {
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [naverMapCenter, setNaverMapCenter] = useState<naver.maps.LatLng>();
  const [coords, setCoords] = useState<GeolocationCoordinates>();

  const createMap = useCallback((options: naver.maps.MapOptions | undefined) => new naver.maps.Map('map', options), []);
  const createMarker = useCallback((options: naver.maps.MarkerOptions) => new naver.maps.Marker(options), []);
  const createPosition = useCallback(
    (latitude: number, longitude: number) => new naver.maps.LatLng(latitude, longitude),
    []
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords(coords);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (coords) {
      const center = createPosition(coords.latitude, coords.longitude);
      const map = createMap({
        center,
        zoom: 17,
      });

      map.setMapTypeId(naver.maps.MapTypeId.NORMAL);
      // map.panBy(new naver.maps.Point(30, 30));
      setNaverMap(map);
      setNaverMapCenter(center);
    }
  }, [coords]);

  return {
    naverMap,
    setNaverMap,
    naverMapCenter,
    coords,
    setCoords,
    createMap,
    createMarker,
    createPosition,
  };
};
