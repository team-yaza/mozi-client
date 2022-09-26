import { useCallback, useEffect, useState } from 'react';
import { Location } from '@/shared/types/location';

export const useNaverMap = () => {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [naverMapCenter, setNaverMapCenter] = useState<naver.maps.LatLng>();
  const [coords, setCoords] = useState<Location>();
  // const [coords, setCoords] = useState<GeolocationCoordinates>();

  // naver.maps.onJSContentLoaded = function (a) {
  //   console.log('우왕');
  // };

  const createMap = useCallback((options: naver.maps.MapOptions | undefined) => new naver.maps.Map('map', options), []);
  const createMarker = useCallback((options: naver.maps.MarkerOptions) => new naver.maps.Marker(options), []);
  const createPosition = useCallback(
    (latitude: number, longitude: number) => new naver.maps.LatLng(latitude, longitude),
    []
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords({ latitude: coords.latitude, longitude: coords.longitude });
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

      // coords가 바뀌면 마커를 가운데에 생성해준다.
      createMarker({
        map,
        position: createPosition(coords.latitude, coords.longitude),
        icon: {
          content: '<img class="marker" src="/assets/svgs/marker.svg" draggable="false" unselectable="on">',
          anchor: new naver.maps.Point(11, 11),
        },
      });
    }
  }, [coords]);

  useEffect(() => {
    let listeners: naver.maps.MapEventListener;

    function onMapLoaded() {
      setIsMapLoading(false);
    }

    if (naverMap) {
      listeners = naver.maps.Event.addListener(naverMap, 'tilesloaded', onMapLoaded);
    }

    return () => {
      if (naverMap) {
        naver.maps.Event.removeListener(listeners);
      }
    };
  }, [naverMap]);

  return {
    naverMap,
    setNaverMap,
    isMapLoading,
    naverMapCenter,
    coords,
    setCoords,
    createMap,
    createMarker,
    createPosition,
  };
};