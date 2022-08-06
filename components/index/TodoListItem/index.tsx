import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

import MapModal from '@/components/index/MapModal';
import { Todo } from '@/shared/types/todo';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { useOnClickOutside } from '@/hooks/useOnClickOutside/index';
import { useContentEditable } from '@/hooks/useContentEditable';
import { focusContentEditableTextToEnd } from '@/shared/utils/focus';
import {
  CheckBox,
  Container,
  DeleteButton,
  TitleContainer,
  Title,
  DescriptionContainer,
  Description,
  SubTaskContainer,
  OptionContainer,
} from './styles';

interface TodoListItemProps {
  id: string;
  _title?: string;
  _description?: string;
  location?: any;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: ({ id, title, longitude, latitude, description }: TodoUpdateRequest) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  id,
  _title,
  _description,
  location,
  onDeleteTodo,
  onUpdateTodo,
}) => {
  const [title, setTitle, titleRef] = useContentEditable(_title);
  const [description, setDescription, descriptionRef] = useContentEditable(_description);

  const [checked, setChecked] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onClickOutsideHandler = useCallback(() => {
    setIsDoubleClicked(false);
    setIsModalOpen(false);
  }, []);

  useOnClickOutside(containerRef, onClickOutsideHandler);

  const onInputTitle = useCallback((e: React.ChangeEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onUpdateTodo({ id, title: e.target.innerText });

    setTitle(e.target.innerText);
    focusContentEditableTextToEnd(e.target);
  }, []);

  const onInputDescription = useCallback((e: React.ChangeEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDescription(e.target.innerText);

    onUpdateTodo({ id, description: e.target.innerText });
    focusContentEditableTextToEnd(e.target);
  }, []);

  const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') onClickOutsideHandler();
  }, []);

  const onCheckHandler = useCallback(() => {
    setChecked((prevCheckedState) => !prevCheckedState);
  }, []);

  const onDoubleClickHandler = useCallback(() => {
    setIsDoubleClicked(true);
  }, []);

  return (
    <Container isDoubleClicked={isDoubleClicked} onDoubleClick={onDoubleClickHandler} ref={containerRef}>
      <TitleContainer>
        <CheckBox onClick={onCheckHandler}>{checked && <Image src="/assets/svgs/check.svg" layout="fill" />}</CheckBox>
        <Title
          placeholder="New Todo"
          contentEditable
          suppressContentEditableWarning
          ref={titleRef}
          onInput={onInputTitle}
          onKeyUp={onKeyUp}
          onDoubleClick={onDoubleClickHandler}
          spellCheck={false}
        >
          {title}
        </Title>
        <DeleteButton onClick={() => onDeleteTodo(id)}>삭제</DeleteButton> {/* ! 나중에 삭제 */}
      </TitleContainer>
      {isDoubleClicked && (
        <>
          <DescriptionContainer>
            <Description
              placeholder="Notes"
              contentEditable
              suppressContentEditableWarning
              ref={descriptionRef}
              onInput={onInputDescription}
              spellCheck={false}
            >
              {description}
            </Description>
          </DescriptionContainer>

          <SubTaskContainer></SubTaskContainer>

          <OptionContainer>
            <button onClick={() => setIsModalOpen(!isModalOpen)}>Map</button>
          </OptionContainer>
        </>
      )}
      {isModalOpen && (
        <MapModal id={id} location={location} onUpdateTodo={onUpdateTodo} setIsModalOpen={setIsModalOpen} />
      )}
    </Container>
  );
};

export default React.memo(TodoListItem);
