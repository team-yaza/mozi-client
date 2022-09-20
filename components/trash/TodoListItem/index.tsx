import { useCallback, useRef, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import Title from './Title';
import Description from './Description';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { Container, CheckBox, DescriptionContainer, MainContainer, OptionsContainer } from './styles';

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
  isFocused,
  setIsFocused,
  index,
  updateTodo,
  // deleteTodo,
}) => {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onClickOutsideHandler = useCallback(() => {
    setIsFocused(-1);
    setIsDoubleClicked(false);
  }, []);

  useOnClickOutside(containerRef, onClickOutsideHandler);

  const onClickHandler = useCallback(() => {
    setIsFocused(index);
  }, []);

  const onDoubleClickHandler = useCallback(() => {
    setIsFocused(-1);
    setIsDoubleClicked((prevState) => !prevState);
  }, []);

  const onCheckHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      updateTodo({ id, done: !done });
    },
    [done]
  );

  return (
    <Container
      ref={containerRef}
      isFocused={isFocused}
      onClick={onClickHandler}
      isDoubleClicked={isDoubleClicked}
      onDoubleClick={onDoubleClickHandler}
    >
      {/* 클릭 안해도 보이는 부분 */}
      <MainContainer>
        <CheckBox checked={done} onClick={onCheckHandler} />
        <Title id={id} title={title} updateTodo={updateTodo} />
      </MainContainer>

      {/* 더블 클릭시 생기는 부분 */}
      {isDoubleClicked && (
        <DescriptionContainer>
          <Description description={description} updateTodo={updateTodo} />
          <OptionsContainer></OptionsContainer>
        </DescriptionContainer>
      )}
    </Container>
  );
};

export default TodoListItem;
