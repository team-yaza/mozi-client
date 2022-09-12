import Image from 'next/image';
import { Container, SpinnerContainer } from './styles';

const Spinner: React.FC = () => {
  return (
    <Container>
      <SpinnerContainer>
        <Image src="/assets/svgs/logo.svg" layout="fill" />
      </SpinnerContainer>
    </Container>
  );
};

export default Spinner;
