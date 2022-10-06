import Image from 'next/image';
import Modal from '@/components/common/Modal';
import { Container, Header, Content } from './styles';
import { UseMutateFunction } from '@tanstack/react-query';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { useCallback } from 'react';

interface LocationDeleteModalProps {
  type: 'alarm' | 'due';
  id: string;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<any, unknown, TodoUpdateRequest, unknown>;
}

const CalendarDeleteModal: React.FC<LocationDeleteModalProps> = ({ type, id, isOpened, setIsOpened, updateTodo }) => {
  const onConfirmHandler = useCallback(() => {
    if (type === 'alarm') updateTodo({ id, alarmDate: null });
    else updateTodo({ id, dueDate: null });
    setIsOpened(false);
  }, [type]);
  return (
    <Modal type="alert" isOpened={isOpened} onClose={() => setIsOpened(false)} onConfirm={onConfirmHandler}>
      <Container>
        <Header>
          <Image src="/assets/svgs/mozi_string.svg" width={40} height={60} />
        </Header>
        <Content>
          {'삭제 버튼을 누르면'}
          <br />
          {'등록된 시간이 삭제됩니다.'}
        </Content>
      </Container>
    </Modal>
  );
};

export default CalendarDeleteModal;
