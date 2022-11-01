import Image from 'next/image';
import Modal from '@/components/common/Modal';
import { Container, Header, Content } from './styles';
import { UseMutateFunction } from '@tanstack/react-query';
// import { TodoUpdateRequest } from '@/shared/types/todo';
import { Todo } from '@/shared/types/todo';

interface DeleteModalProps {
  todo: Todo;
  type: 'alarm' | 'due' | 'location';
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<unknown, unknown, unknown, unknown>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ todo, type, isOpened, setIsOpened, updateTodo }) => {
  const typeToString = () => {
    if (type === 'location') return '장소가';
    else if (type === 'alarm') return '시간 알림이';
    else if (type === 'due') return '마감일이';
  };

  const confirmHandler = () => {
    if (type === 'location') updateTodo({ ...todo, locationName: null, latitude: null, longitude: null });
    else if (type === 'alarm') updateTodo({ ...todo, alarmDate: null });
    else if (type === 'due') updateTodo({ ...todo, dueDate: null });
    setIsOpened(false);
  };

  return (
    <Modal type="alert" isOpened={isOpened} onClose={() => setIsOpened(false)} onConfirm={confirmHandler}>
      <Container>
        <Header>
          <Image src="/assets/svgs/mozi_string.svg" width={40} height={60} />
        </Header>
        <Content>
          {'삭제 버튼을 누르면'}
          <br />
          {`등록된 ${typeToString()} 삭제됩니다.`}
        </Content>
      </Container>
    </Modal>
  );
};

export default DeleteModal;
