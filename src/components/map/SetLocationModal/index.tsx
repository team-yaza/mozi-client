import React, { useId, useLayoutEffect, useRef } from 'react';

import { TRANSITION_DELAY } from '@/shared/constants/delay';
import Modal from '@/components/common/Modal';
import CommonTextInput from '@/components/common/TextInput/index';
import { LOCATION_INPUT_LENGTH } from '@/shared/constants/input';
import { ContentContainer, Title } from './styles';
import { useInput } from '@/hooks/useInput';
interface SetLocationModalProps {
  isOpened: boolean;
  onClose: () => void;
  createTodo: ({ title, locationName }: { title: string; locationName: string }) => void;
}

const SetLocationModal: React.FC<SetLocationModalProps> = ({ isOpened, onClose, createTodo }) => {
  const [locationName, onChangeLocationNameHandler] = useInput('');
  const [title, onChangeTitleHandler] = useInput('');
  const locationNameInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const locationInputId = useId();
  const titleInputId = useId();

  useLayoutEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpened) {
      timer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, TRANSITION_DELAY);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOpened]);

  const onConfirm = () => {
    createTodo({ title, locationName });
    onClose();
  };

  return (
    <Modal isOpened={isOpened} onClose={onClose} onConfirm={onConfirm}>
      <ContentContainer>
        <Title htmlFor={titleInputId}>🚩 할 일 추가</Title>
        <CommonTextInput
          id={titleInputId}
          ref={titleInputRef}
          placeholder="New Todo"
          spellCheck={false}
          value={title}
          onChange={onChangeTitleHandler}
          supportsMaxLength
          maxLength={LOCATION_INPUT_LENGTH}
        />
        <CommonTextInput
          id={locationInputId}
          ref={locationNameInputRef}
          placeholder="장소 이름 입력"
          spellCheck={false}
          value={locationName}
          onChange={onChangeLocationNameHandler}
          supportsMaxLength
          maxLength={LOCATION_INPUT_LENGTH}
        />
      </ContentContainer>
    </Modal>
  );
};

export default React.memo(SetLocationModal);
