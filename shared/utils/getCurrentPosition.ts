import { Dispatch, SetStateAction } from 'react';

export const getCurrentPosition = (
  callback: Dispatch<
    SetStateAction<
      | string
      | {
          latitude: number;
          longitude: number;
        }
    >
  >
) =>
  navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
    callback({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
