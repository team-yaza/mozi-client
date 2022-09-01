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

      // new naver.maps.Marker({
      //   map,
      //   position: new naver.maps.LatLng(coords.latitude, coords.longitude),
      // });

      // createMarker({
      //   map,
      //   position: createPosition(coords.latitude, coords.longitude),
      // });

      setNaverMap(map);
      setNaverMapCenter(center);
    }
  }, [coords]);

  // const mapOptions = {
  //   // center: new naver.maps.LatLng(pos[0], pos[1]),
  //   zoomControl: true,
  //   zoomControlOptions: {
  //     style: naver.maps.ZoomControlStyle.SMALL,
  //     position: naver.maps.Position.RIGHT_BOTTOM,
  //   },
  //   logoControlOptions: {
  //     position: naver.maps.Position.RIGHT_BOTTOM,
  //   },
  //   scaleControl: false,
  //   scaleControlOptions: {
  //     position: naver.maps.Position.RIGHT_CENTER,
  //   },
  //   mapDataControl: false,
  // };

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

// export const useMap = (location: GeoJson | undefined = undefined) => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const { myLocation } = useLocation();
//   const [markerLocation, setMarkerLocation] = useState<Location | string>('');

//   useEffect(() => {
//     if (typeof myLocation !== 'string') {
//       // 현재 위치 추적
//       const currentPosition =
//         location && location.coordinates[0] && location.coordinates[1]
//           ? { lat: location.coordinates[1], lon: location.coordinates[0] }
//           : { lat: myLocation.latitude, lon: myLocation.longitude };

//       setMarkerLocation({ latitude: currentPosition.lat, longitude: currentPosition.lon });

//       if (mapRef.current) {
//         const map = new naver.maps.Map('map', {
//           center: new naver.maps.LatLng(currentPosition.lat, currentPosition.lon),
//           scaleControl: false,
//           logoControl: false,
//           mapDataControl: false,
//           zoomControl: false,
//           minZoom: 6,
//         });

//         const marker = new naver.maps.Marker({
//           map,
//           position: new naver.maps.LatLng(currentPosition.lat, currentPosition.lon),
//         });

//         naver.maps.Event.addListener(map, 'click', function (e) {
//           marker.setPosition(e.coord);
//           setMarkerLocation({ latitude: e.coord.y, longitude: e.coord.x });
//         });
//       }
//     }
//   }, [myLocation]);

//   const createMap = useCallback((options: naver.maps.MarkerOptions) => new naver.maps.Marker(options), []);
//   const createMarker = useCallback((options: naver.maps.MarkerOptions) => new naver.maps.Marker(options), []);

//   return {
//     mapRef,
//     myLocation,
//     markerLocation,
//     createMap,
//     createMarker,
//   };
// };
