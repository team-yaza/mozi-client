import Image from 'next/image';
import { Container, Header, Content } from './styles';

const SetLocationModal: React.FC = () => {
  return (
    <Container>
      <Header>
        <Image src="/assets/svgs/mozi_string.svg" width={40} height={60} />
      </Header>
      <Content>
        {'삭제 버튼을 누르면'}
        <br />
        {'등록된 장소가 삭제됩니다.'}
      </Content>
    </Container>
  );
};

export default SetLocationModal;
