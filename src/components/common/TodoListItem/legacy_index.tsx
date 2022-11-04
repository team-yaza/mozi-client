import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import Title from './Title/index';
import Description from './Description/index';
import Map from './Map/index';
import Options from './Options/index';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
// import { TodoUpdateRequest } from '@/shared/types/todo';
import { debounce } from '@/shared/utils/debounce';
import { DEADLINE, PLACE, CALENDAR } from '@/components/common/Figure';
import { CheckBox, Container, DescriptionContainer, MainContainer, IconContainer, Icons } from './styles';
import { Todo } from '@/shared/types/todo';

interface TodoListItemProps {
  todo: Todo;
  id: string;
  title?: string;
  description?: string;
  longitude?: number;
  latitude?: number;
  locationName?: string;
  alarmDate?: string;
  dueDate?: string;
  done: boolean;
  index: number;
  isFocused?: boolean;
  setIsFocused: Dispatch<SetStateAction<number>>;
  setIsEditing?: Dispatch<SetStateAction<number>>;
  updateTodo: UseMutateFunction<unknown, unknown, unknown, unknown>;
  deleteTodo: UseMutateFunction<unknown, unknown, string, unknown>;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  index,
  alarmDate,
  dueDate,
  isFocused,
  locationName,
  setIsFocused,
  setIsEditing,
  updateTodo,
  deleteTodo,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isMapOpened, setIsMapOpened] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const onClickOutsideHandler = useCallback(() => {
    setIsFocused(-1);
    setIsMapOpened(false);
    setIsDoubleClicked(false);
  }, [setIsFocused, setIsMapOpened, setIsDoubleClicked]);

  useOnClickOutside(containerRef, onClickOutsideHandler);

  useEffect(() => {
    if (todo.done) setIsChecked(true);
  }, [setIsChecked]);

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
  }, [todo.id, deleteTodo, isFocused]);

  useEffect(() => {
    if (isDoubleClicked && setIsEditing) setIsEditing(index);
  }, [isDoubleClicked, setIsEditing]);

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

  const onCheckHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setIsChecked((prevState) => !prevState);
      debounce(() => updateTodo({ ...todo, done: !todo.done }), 500)();
    },
    [todo.done, setIsChecked]
  );

  const renderIcons = () => {
    const icons = [];

    if (locationName) icons.push(<PLACE />);
    if (alarmDate) icons.push(<CALENDAR />);
    if (dueDate) icons.push(<DEADLINE />);

    return icons.map((icon) => <IconContainer>{icon}</IconContainer>);
  };

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
        <CheckBox checked={isChecked} onClick={onCheckHandler} />
        <Title
          todo={todo}
          isDoubleClicked={isDoubleClicked}
          setIsDoubleClicked={setIsDoubleClicked}
          updateTodo={updateTodo}
        />

        {!isDoubleClicked && <Icons>{renderIcons()}</Icons>}
      </MainContainer>

      {/* 더블 클릭시 생기는 부분 */}

      {isDoubleClicked && (
        <>
          <DescriptionContainer>
            <Description todo={todo} setIsDoubleClicked={setIsDoubleClicked} updateTodo={updateTodo} />
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
