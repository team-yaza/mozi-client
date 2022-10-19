import Image from 'next/image';
import Modal from '@/components/common/Modal';
import { Container, Header, Content } from './styles';
import { UseMutateFunction } from '@tanstack/react-query';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { useCallback } from 'react';

interface DeleteLocationModalProps {
  id: string;
  type: 'alarm' | 'due' | 'location';
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<any, unknown, TodoUpdateRequest, unknown>;
}

const DeleteLocationModal: React.FC<DeleteLocationModalProps> = ({ type, id, isOpened, setIsOpened, updateTodo }) => {
  const typeToString = useCallback(() => {
    if (type === 'location') return '장소가';
    else if (type === 'alarm') return '시간 알림이';
    else if (type === 'due') return '마감일이';
  }, [type]);

  const confirmHandler = useCallback(() => {
    if (type === 'location') updateTodo({ id, locationName: null, latitude: null, longitude: null });
    else if (type === 'alarm') updateTodo({ id, alarmDate: null });
    else if (type === 'due') updateTodo({ id, dueDate: null });
    setIsOpened(false);
  }, [type]);

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

export default DeleteLocationModal;
