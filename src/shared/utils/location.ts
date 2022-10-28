import { MutableRefObject } from 'react';

import { Location } from '@/shared/types/location';

export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  if (lat1 == lat2 && lon1 == lon2) return 0;

  const radLat1 = (Math.PI * lat1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radTheta = (Math.PI * theta) / 180;
  let dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344 * 1000;
  if (dist < 100) dist = Math.round(dist / 10) * 10;
  else dist = Math.round(dist / 100) * 100;

  return dist;
};

export const getCurrentPositionRef = (locationRef: MutableRefObject<Location>) =>
  navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
    locationRef.current.latitude = position.coords.latitude;
    locationRef.current.longitude = position.coords.longitude;
  });

export const getCurrentPosition = (options?: PositionOptions): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, options));
};

export const trackCurrentPosition = (
  successCallback: PositionCallback,
  errorCallback: PositionErrorCallback | null | undefined
) => {
  navigator.geolocation.watchPosition(successCallback, errorCallback, { enableHighAccuracy: true, timeout: 5000 });
};
