import { useCallback, useState, useEffect } from 'react';

import { getCurrentPosition } from '@/shared/utils/getCurrentPosition';
import { Location } from '@/shared/types/location';

export const useLocation = () => {
  const [myLocation, setMyLocation] = useState<Location | string>('');

  useEffect(() => {
    if (navigator.geolocation) {
      getCurrentPosition(setMyLocation);
    } else {
      window.alert('현재 위치를 알 수 없어 기본 위치로 지정합니다.');
      setMyLocation({ latitude: 37.4862618, longitude: 127.1222903 });
    }
  }, []);

  const updateCurrentPosition = useCallback(() => {
    getCurrentPosition(setMyLocation);
  }, []);

  return { myLocation, setMyLocation, updateCurrentPosition };
};
