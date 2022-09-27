import Image from 'next/image';
import { Container, Wrapper, LocationNameInput, ConfirmButtonnDiv, ConfirmButton, Header } from './styles';

const SetLocationModal: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Header>
          <Image src="/assets/svgs/flying_mozi.svg" width={30} height={40} />
        </Header>
        <LocationNameInput placeholder="장소 이름을 적어주세요"></LocationNameInput>
        <ConfirmButtonnDiv>
          <ConfirmButton>삭제</ConfirmButton>
          <ConfirmButton>확인</ConfirmButton>
        </ConfirmButtonnDiv>
      </Wrapper>
    </Container>
  );
};

export default SetLocationModal;
