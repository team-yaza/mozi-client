import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import Title from './Title';
import Description from './Description';
import Map from './Map';
import Options from './Options';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { debounce } from '@/shared/utils/debounce';
import { PLACE } from '@/components/common/Figure';
import { CheckBox, Container, DescriptionContainer, MainContainer, IconContainer } from './styles';

interface TodoListItemProps {
  id: string;
  title?: string;
  description?: string;
  longitude?: number;
  latitude?: number;
  locationName?: string;
  done: boolean;
  index: number;
  isFocused?: boolean;
  setIsFocused: (index: number) => void;
  updateTodo: UseMutateFunction<unknown, unknown, TodoUpdateRequest, unknown>;
  deleteTodo: UseMutateFunction<void, unknown, string, unknown>;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  id,
  title,
  description,
  longitude,
  latitude,
  done,
  index,
  isFocused,
  locationName,
  setIsFocused,
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
  }, []);

  useOnClickOutside(containerRef, onClickOutsideHandler);

  useEffect(() => {
    if (done) setIsChecked(true);
  }, []);

  const onClickHandler = useCallback(() => {
    setIsFocused(index);
  }, []);

  const onDoubleClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (document.getElementById('modal-root')?.contains(e.target as HTMLDivElement)) return;

    setIsFocused(-1);
    setIsMapOpened(false);
    setIsDoubleClicked((prevState) => !prevState);
  }, []);

  const onCheckHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setIsChecked((prevState) => !prevState);
      debounce(() => updateTodo({ id, done: !done }), 500)();
    },
    [done]
  );

  const onDeleteHandler = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (isFocused && !isDoubleClicked) {
          deleteTodo(id);
        }
      }
    },
    [isFocused]
  );

  return (
    <Container
      ref={containerRef}
      tabIndex={0}
      isFocused={isFocused}
      isDoubleClicked={isDoubleClicked}
      onClick={onClickHandler}
      onDoubleClick={onDoubleClickHandler}
      onKeyDown={onDeleteHandler}
    >
      {/* 클릭 안해도 보이는 부분 */}

      <MainContainer>
        <CheckBox checked={isChecked} onClick={onCheckHandler} />
        <Title id={id} title={title} isDoubleClicked={isDoubleClicked} updateTodo={updateTodo} />
        {!isDoubleClicked && locationName && (
          <IconContainer>
            <PLACE focused={true} />
          </IconContainer>
        )}
      </MainContainer>

      {/* 더블 클릭시 생기는 부분 */}

      {isDoubleClicked && (
        <>
          <DescriptionContainer>
            <Description id={id} description={description} updateTodo={updateTodo} />
          </DescriptionContainer>
          <Options id={id} locationName={locationName} setIsMapOpened={setIsMapOpened} updateTodo={updateTodo} />
        </>
      )}

      {/* <Map /> */}

      {isMapOpened && (
        <Map
          id={id}
          updateTodo={updateTodo}
          setIsMapOpened={setIsMapOpened}
          longitude={longitude}
          latitude={latitude}
        />
      )}
    </Container>
  );
};

export default React.memo(TodoListItem);
