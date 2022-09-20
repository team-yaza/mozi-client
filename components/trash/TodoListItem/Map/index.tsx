import { useRef } from 'react';

import { useNaverMap } from '@/hooks/useNaverMap';
import { Container } from './styles';

const Map = () => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  // const { naverMap } =
  useNaverMap();

  return (
    <Container>
      <div id="map" ref={naverMapRef} style={{ width: '500px', height: '300px' }}></div>
    </Container>
  );
};

export default Map;
