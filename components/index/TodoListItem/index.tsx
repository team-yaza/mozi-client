import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

import MapModal from '@/components/index/MapModal';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { useOnClickOutside } from '@/hooks/useOnClickOutside/index';
import ADD_CALENDAR from '@/components/common/Figure/ADD_CALENDAR';
import ADD_DEADLINE from '@/components/common/Figure/ADD_DEADLINE';
import ADD_PLACE from '@/components/common/Figure/ADD_PLACE';
import ADD_TAG from '@/components/common/Figure/ADD_TAG';
import { Todo } from '@/shared/types/todo';
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
  OptionsContainer,
} from './styles';
import { todoStore } from '@/store/forage';

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: ({ id, title, longitude, latitude, description }: TodoUpdateRequest) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onDeleteTodo, onUpdateTodo }) => {
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
    onUpdateTodo({ id: todo.id, title: e.target.innerText });

    todoStore.setItem(todo.id, { ...todo, title: e.target.innerText });
  }, []);

  const onInputDescription = useCallback((e: React.ChangeEvent<HTMLDivElement>) => {
    e.stopPropagation();

    onUpdateTodo({ id: todo.id, description: e.target.innerText });
  }, []);

  const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') onClickOutsideHandler();
    else if (e.key === 'Escape') onClickOutsideHandler();
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
          onInput={onInputTitle}
          onKeyUp={onKeyUp}
          onDoubleClick={onDoubleClickHandler}
          spellCheck={false}
        >
          {todo.title}
        </Title>
        <DeleteButton onClick={() => onDeleteTodo(todo.id)}>삭제</DeleteButton> {/* ! 나중에 삭제 */}
      </TitleContainer>
      {isDoubleClicked && (
        <>
          <DescriptionContainer>
            <Description
              placeholder="Notes"
              contentEditable
              suppressContentEditableWarning
              onInput={onInputDescription}
              onKeyUp={onKeyUp}
              spellCheck={false}
            >
              {todo.description}
            </Description>
          </DescriptionContainer>

          <SubTaskContainer></SubTaskContainer>

          <OptionsContainer>
            <OptionContainer onClick={() => setIsModalOpen(!isModalOpen)}>
              <ADD_PLACE stroke="#585858" />
            </OptionContainer>
            <OptionContainer onClick={() => 1}>
              <ADD_CALENDAR stroke="#585858" />
            </OptionContainer>
            <OptionContainer onClick={() => 2}>
              <ADD_TAG stroke="#585858" />
            </OptionContainer>
            <OptionContainer onClick={() => 3}>
              <ADD_DEADLINE stroke="#585858" />
            </OptionContainer>
          </OptionsContainer>
        </>
      )}
      {isModalOpen && (
        <MapModal id={todo.id} location={todo.location} onUpdateTodo={onUpdateTodo} setIsModalOpen={setIsModalOpen} />
      )}
    </Container>
  );
};

export default React.memo(TodoListItem);
