import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

import { Todo } from '@/shared/types/todo';
import { MapModal } from '@/components/index/MapModal';
import { useOnClickOutside } from '@/hooks/useOnClickOutside/index';
import { CheckBox, Container, DeleteButton, Content, Title, Description, Footer } from './styles';

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: ({ id, title }: { id: string; title: string }) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onDeleteTodo, onUpdateTodo }) => {
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
    onUpdateTodo({ id: todo._id, title: e.target.value });
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

  return (
    <Container isDoubleClicked={isDoubleClicked} onDoubleClick={onDoubleClickHandler} ref={containerRef}>
      <Title>
        <CheckBox onClick={onCheckHandler}>{checked && <Image src="/assets/svgs/check.svg" layout="fill" />}</CheckBox>
        <Content
          placeholder="new todo"
          onDoubleClick={onDoubleClickHandler}
          ref={inputRef}
          onChange={onChange}
          onKeyUp={onKeyUp}
          defaultValue={todo.title}
        />
        <DeleteButton onClick={() => onDeleteTodo(todo._id)}>삭제</DeleteButton>
      </Title>
      {isDoubleClicked && (
        <Description>
          <Footer>
            <button onClick={() => setIsModal(true)}>Map</button>
          </Footer>
        </Description>
      )}
      {isModal && <MapModal />}
    </Container>
  );
};

export default React.memo(TodoListItem);
