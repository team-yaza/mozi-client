import { useRef } from 'react';

import { useNaverMap } from '@/hooks/useNaverMap';
import Spinner from '@/components/common/Spinner';
import { Container, SpinnerContainer } from './styles';

const Map = () => {
  const naverMapRef = useRef<HTMLDivElement>(null);
  const { isMapLoading } = useNaverMap();

  return (
    <Container>
      {isMapLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}

      <div id="map" ref={naverMapRef} style={{ width: '100%', height: '30rem' }}></div>
    </Container>
  );
};

export default Map;
