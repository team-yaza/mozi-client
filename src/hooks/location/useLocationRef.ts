import { useRef, useEffect, useCallback } from 'react';

import { getCurrentPositionRef } from '@/shared/utils/getCurrentPosition';
import { Location } from '@/shared/types/location';

export const useLocationRef = () => {
  const myLocationRef = useRef<Location>({ latitude: 37.4862618, longitude: 127.1222903 });

  useEffect(() => {
    if (navigator.geolocation) {
      getCurrentPositionRef(myLocationRef);
    }
  }, []);

  const updateCurrentPosition = useCallback(() => {
    if (!myLocationRef.current) return;
    getCurrentPositionRef(myLocationRef);
  }, []);

  return { myLocationRef, updateCurrentPosition };
};
