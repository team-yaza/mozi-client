import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { Location } from '@/shared/types/location';

export const getCurrentPosition = (callback: Dispatch<SetStateAction<string | Location>>) =>
  navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
    callback({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });

export const getCurrentPositionRef = (locationRef: MutableRefObject<Location>) =>
  navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
    locationRef.current.latitude = position.coords.latitude;
    locationRef.current.longitude = position.coords.longitude;
  });
