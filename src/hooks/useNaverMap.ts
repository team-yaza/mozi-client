import { useCallback, useEffect, useState } from 'react';
import { Location } from '@/shared/types/location';

export const useNaverMap = (location?: Location) => {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [naverMapCenter, setNaverMapCenter] = useState<naver.maps.LatLng>();
  const [coords, setCoords] = useState<Location>();
  const [markerCoords, setMarkderCoords] = useState<Location>();

  const createMap = useCallback((options: naver.maps.MapOptions | undefined) => new naver.maps.Map('map', options), []);
  const createMarker = useCallback((options: naver.maps.MarkerOptions) => new naver.maps.Marker(options), []);
  const createPosition = useCallback(
    (latitude: number, longitude: number) => new naver.maps.LatLng(latitude, longitude),
    []
  );

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      setCoords(location);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords({ latitude: coords.latitude, longitude: coords.longitude });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    let mapEventListeners: naver.maps.MapEventListener;

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
          position: 10, // BOTTOM_LEFT = 10 (NaverMap 정의)
        },
      });

      map.setMapTypeId(naver.maps.MapTypeId.NORMAL);
      // map.panBy(new naver.maps.Point(30, 30));
      setNaverMap(map);
      setNaverMapCenter(center);
      setMarkderCoords(coords);

      // coords가 바뀌면 마커를 가운데에 생성해준다.
      // const marker = createMarker({
      //   map,
      //   position: createPosition(coords.latitude, coords.longitude),
      //   icon: {
      //     content: '<img class="marker" src="/assets/svgs/marker.svg" draggable="false" unselectable="on">',
      //     anchor: new naver.maps.Point(11, 11),
      //   },
      // });

      mapEventListeners = naver.maps.Event.addListener(map, 'click', (e) => {
        e;
        // marker.setPosition(e.coord);
        // setMarkderCoords({ longitude: e.coord.x, latitude: e.coord.y });
      });
    }

    return () => {
      naver.maps.Event.removeListener(mapEventListeners);
    };
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
    markerCoords,
    setCoords,
    createMap,
    createMarker,
    createPosition,
  };
};
