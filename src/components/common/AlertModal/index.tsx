import Image from 'next/image';
import { useCallback } from 'react';
import { Container, Wrapper, ButtonnDiv, CancelButton, ConfirmButton, Header, Content } from './styles';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { UseMutateFunction } from '@tanstack/react-query';

interface SetLocationModalProps {
  id: string;
  updateTodo: UseMutateFunction<unknown, unknown, TodoUpdateRequest, unknown>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetLocationModal: React.FC<SetLocationModalProps> = ({ id, updateTodo, setIsModalOpen }) => {
  const onConfirmCliCkHandler = useCallback(() => {
    updateTodo({ id, longitude: null, latitude: null, locationName: null });
    setIsModalOpen(false);
  }, []);

  const onCancelClickHandler = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onEnterKeyPressHandler = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onConfirmCliCkHandler();
    }
  }, []);

  return (
    <Container>
      <Wrapper onKeyDown={onEnterKeyPressHandler}>
        <Header>
          <Image src="/assets/svgs/mozi_string.svg" width={40} height={60} />
        </Header>
        <Content>
          {'삭제 버튼을 누르면'}
          <br />
          {'등록된 장소가 삭제됩니다.'}
        </Content>
        <ButtonnDiv>
          <CancelButton onClick={onCancelClickHandler}>취소</CancelButton>
          <ConfirmButton onClick={onConfirmCliCkHandler}>삭제</ConfirmButton>
        </ButtonnDiv>
      </Wrapper>
    </Container>
  );
};

export default SetLocationModal;
