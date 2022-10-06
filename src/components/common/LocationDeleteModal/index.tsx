import Image from 'next/image';
import Modal from '@/components/common/Modal';
import { Container, Header, Content } from './styles';
import { UseMutateFunction } from '@tanstack/react-query';
import { TodoUpdateRequest } from '@/shared/types/todo';

interface LocationDeleteModalProps {
  id: string;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<any, unknown, TodoUpdateRequest, unknown>;
}

const LocationDeleteModal: React.FC<LocationDeleteModalProps> = ({ id, isOpened, setIsOpened, updateTodo }) => {
  return (
    <Modal
      type="alert"
      isOpened={isOpened}
      onClose={() => setIsOpened(false)}
      onConfirm={() => {
        setIsOpened(false);
        updateTodo({ id, locationName: null, latitude: null, longitude: null });
      }}
    >
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
    </Modal>
  );
};

export default LocationDeleteModal;
