import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { Container, Wrapper, LocationNameInput, ButtonnDiv, Button, Header } from './styles';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { UseMutateFunction } from '@tanstack/react-query';

interface SetLocationModalProps {
  id: string;
  longitude?: number;
  latitude?: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMapOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<unknown, unknown, TodoUpdateRequest, unknown>;
}

const SetLocationModal: React.FC<SetLocationModalProps> = ({
  id,
  longitude,
  latitude,
  updateTodo,
  setIsModalOpen,
  setIsMapOpened,
}) => {
  const locationNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!locationNameRef.current) return;
    locationNameRef.current.focus();
  }, []);

  const onConfirmClickHandler = useCallback(() => {
    if (!locationNameRef.current || locationNameRef.current.value == '') return;
    updateTodo({ id, longitude, latitude, locationName: locationNameRef.current.value });
    setIsModalOpen(false);
    setIsMapOpened(false);
  }, []);

  const onCancelClickHandler = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onEnterKeyPressHandler = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onConfirmClickHandler();
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        <Header>
          <Image src="/assets/svgs/mozi_string.svg" width={30} height={40} />
        </Header>
        <LocationNameInput
          placeholder="장소 이름을 적어주세요"
          ref={locationNameRef}
          onKeyDown={onEnterKeyPressHandler}
        />
        <ButtonnDiv>
          <Button onClick={onCancelClickHandler}>취소</Button>
          <Button onClick={onConfirmClickHandler}>확인</Button>
        </ButtonnDiv>
      </Wrapper>
    </Container>
  );
};

export default SetLocationModal;
