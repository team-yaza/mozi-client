import React from 'react';
import { LOGO } from '@/components/common/Figure';
import { Container, SpinnerContainer } from './styles';

const Spinner: React.FC = () => {
  return (
    <Container>
      <SpinnerContainer>
        <LOGO />
      </SpinnerContainer>
    </Container>
  );
};

export default React.memo(Spinner);
