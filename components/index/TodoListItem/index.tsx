import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

import { Todo } from '@/shared/types/todo';
import { MapModal } from '@/components/index/MapModal';
import { useOnClickOutside } from '@/hooks/useOnClickOutside/index';
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
import { UpdateTodoProps } from '@/shared/types/todo';

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: ({ id, title, longitude, latitude }: UpdateTodoProps) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onDeleteTodo, onUpdateTodo }) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string | undefined>(todo.description);
  const [checked, setChecked] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onClickOutsideHandler = useCallback(() => {
    setIsDoubleClicked(false);
    setIsModal(false);
  }, []);

  useOnClickOutside(containerRef, onClickOutsideHandler);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setTitle(e.target.value);
    onUpdateTodo({ id: todo.id, title: e.target.value });
  }, []);

  const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onClickOutsideHandler();
  }, []);

  const onCheckHandler = useCallback(() => {
    setChecked((prevCheckedState) => !prevCheckedState);
  }, []);

  const onDoubleClickHandler = useCallback(() => {
    setIsDoubleClicked(true);
  }, []);

  const onInputDescription = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setDescription(e.target.innerText);

    if (description) onUpdateTodo({ id: todo.id, description: e.target.value });
  }, []);

  return (
    <Container isDoubleClicked={isDoubleClicked} onDoubleClick={onDoubleClickHandler} ref={containerRef}>
      <TitleContainer>
        <CheckBox onClick={onCheckHandler}>{checked && <Image src="/assets/svgs/check.svg" layout="fill" />}</CheckBox>
        <Title
          ref={inputRef}
          placeholder="New Todo"
          value={title}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onDoubleClick={onDoubleClickHandler}
        />
        <DeleteButton onClick={() => onDeleteTodo(todo.id)}>삭제</DeleteButton> {/* ! 나중에 삭제 */}
      </TitleContainer>
      {isDoubleClicked && (
        <>
          <DescriptionContainer>
            <Description
              placeholder="Notes"
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              onInput={onInputDescription}
            >
              {description}
            </Description>
          </DescriptionContainer>

          <SubTaskContainer></SubTaskContainer>

          <OptionContainer>
            <button onClick={() => setIsModal(!isModal)}>Map</button>
          </OptionContainer>
        </>
      )}
      {isModal && <MapModal id={todo.id} onUpdateTodo={onUpdateTodo} setIsModal={setIsModal} />}
    </Container>
  );
};

export default React.memo(TodoListItem);
