import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import Title from './Title';
import Description from './Description';
import Map from './Map';
import Options from './Options';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import {
  Todo,
  // TodoUpdateRequest
} from '@/shared/types/todo';
import { DEADLINE, PLACE, CALENDAR } from '@/components/common/Figure';
import { debounce } from '@/shared/utils/debounce';
import { CheckBox, Container, DescriptionContainer, IconContainer, Icons, MainContainer } from './styles';

interface TodoListItemProps {
  todo: Todo;
  index: number;
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<number>>;
  setIsEditing?: Dispatch<SetStateAction<number>>;
  updateTodo: UseMutateFunction<unknown, unknown, unknown, unknown>;
  deleteTodo: UseMutateFunction<unknown, unknown, string, unknown>;
}

const TodoListItem = ({
  todo,
  index,
  isFocused,
  setIsFocused,
  setIsEditing,
  updateTodo,
  deleteTodo,
}: TodoListItemProps) => {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isMapOpened, setIsMapOpened] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deleteTodoHandler = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        deleteTodo(todo.id);
      }
    };

    if (isFocused) {
      document.addEventListener('keydown', deleteTodoHandler);
    }

    return () => document.removeEventListener('keydown', deleteTodoHandler);
  }, [todo, deleteTodo, isFocused]);

  useEffect(() => {
    if (isDoubleClicked && setIsEditing) setIsEditing(index);
  }, [isDoubleClicked, setIsEditing, index]);

  const onClickOutsideHandler = useCallback(() => {
    setIsFocused(-1);
    setIsMapOpened(false);
    setIsDoubleClicked(false);
  }, [setIsFocused, setIsMapOpened, setIsDoubleClicked]);

  useOnClickOutside(containerRef, onClickOutsideHandler);

  const onClickHandler = useCallback(() => {
    if (isDoubleClicked) return;

    setIsFocused(index);
  }, [index, setIsFocused, isDoubleClicked]);

  const onDoubleClickHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (document.getElementById('modal-root')?.contains(e.target as HTMLDivElement)) return;

      setIsFocused(-1);
      setIsMapOpened(false);
      setIsDoubleClicked((prevState) => !prevState);
    },
    [setIsFocused, setIsMapOpened, setIsDoubleClicked]
  );

  const debouncedUpdateTodo = useCallback(
    debounce(() => updateTodo({ id: todo.id, done: !todo.done }), 500),
    [todo, updateTodo, debounce]
  );

  const onCheckHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      debouncedUpdateTodo();
    },
    [debouncedUpdateTodo]
  );

  const renderIcons = useCallback(() => {
    const icons = [];

    if (todo.locationName) icons.push(<PLACE />);
    if (todo.alarmDate) icons.push(<CALENDAR />);
    if (todo.dueDate) icons.push(<DEADLINE />);

    return icons.map((icon) => <IconContainer>{icon}</IconContainer>);
  }, [todo]);

  return (
    <Container
      ref={containerRef}
      tabIndex={0}
      isFocused={isFocused}
      isDoubleClicked={isDoubleClicked}
      onClick={onClickHandler}
      onDoubleClick={onDoubleClickHandler}
    >
      {/* 클릭 안해도 보이는 부분 */}

      <MainContainer>
        <CheckBox checked={todo.done} onClick={onCheckHandler} />
        <Title
          todo={todo}
          isDoubleClicked={isDoubleClicked}
          updateTodo={updateTodo}
          setIsDoubleClicked={setIsDoubleClicked}
        />
        {!isDoubleClicked && <Icons>{renderIcons()}</Icons>}
      </MainContainer>

      {/* 더블 클릭시 생기는 부분 */}

      {isDoubleClicked && (
        <>
          <DescriptionContainer>
            <Description
              todo={todo}
              description={todo.description}
              updateTodo={updateTodo}
              setIsDoubleClicked={setIsDoubleClicked}
            />
          </DescriptionContainer>
          <Options todo={todo} setIsMapOpened={setIsMapOpened} updateTodo={updateTodo} />
        </>
      )}

      {/* <Map /> */}

      {isMapOpened && <Map todo={todo} updateTodo={updateTodo} />}
    </Container>
  );
};

export default React.memo(TodoListItem);
