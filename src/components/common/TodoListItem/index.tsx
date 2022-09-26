import React, { useCallback, useRef, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import Title from './Title';
import Description from './Description';
import Map from './Map';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { PLACE } from '@/components/common/Figure';
import { CheckBox, Container, DescriptionContainer, MainContainer, OptionContainer, OptionsContainer } from './styles';

interface TodoListItemProps {
  id: string;
  title?: string;
  description?: string;
  done: boolean;
  index: number;
  isFocused?: boolean;
  setIsFocused: (index: number) => void;
  updateTodo: UseMutateFunction<any, unknown, TodoUpdateRequest, unknown>;
  deleteTodo: UseMutateFunction<void, unknown, string, unknown>;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  id,
  title,
  description,
  done,
  index,
  isFocused,
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

  const onClickHandler = useCallback(() => {
    setIsFocused(index);
  }, []);

  const onDoubleClickHandler = useCallback(() => {
    setIsFocused(-1);
    setIsMapOpened(false);
    setIsDoubleClicked((prevState) => !prevState);
  }, []);

  const onCheckHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setIsChecked((prevState) => !prevState);
      updateTodo({ id, done: !done });
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

  const onClickMap = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsMapOpened((prevState) => !prevState);
  }, []);

  return (
    <Container
      ref={containerRef}
      tabIndex={0}
      isFocused={isFocused}
      onClick={onClickHandler}
      isDoubleClicked={isDoubleClicked}
      onDoubleClick={onDoubleClickHandler}
      onKeyDown={onDeleteHandler}
    >
      {/* 클릭 안해도 보이는 부분 */}

      <MainContainer>
        <CheckBox checked={isChecked} onClick={onCheckHandler} />
        <Title id={id} title={title} isDoubleClicked={isDoubleClicked} updateTodo={updateTodo} />
      </MainContainer>

      {/* 더블 클릭시 생기는 부분 */}

      {isDoubleClicked && (
        <>
          <DescriptionContainer>
            <Description id={id} description={description} updateTodo={updateTodo} />
          </DescriptionContainer>
          <OptionsContainer>
            <OptionContainer onClick={onClickMap}>
              <PLACE focused={!isMapOpened} />
            </OptionContainer>
          </OptionsContainer>
        </>
      )}

      {/* <Map /> */}

      {isMapOpened && <Map />}
    </Container>
  );
};

export default React.memo(TodoListItem);
