import { useCallback, useEffect, useRef } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { TodoUpdateRequest } from '@/shared/types/todo';
import { Container } from './styles';

interface TitleProps {
  id: string;
  title?: string;
  isDoubleClicked: boolean;
  updateTodo: UseMutateFunction<any, unknown, TodoUpdateRequest, unknown>;
  // deleteTodo: UseMutateFunction<void, unknown, string, unknown>;
}

const Title: React.FC<TitleProps> = ({ id, title = '', isDoubleClicked, updateTodo }) => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && title) {
      titleRef.current.innerText = title;
    }
  }, []);

  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, [isDoubleClicked]);

  const onInputTitle = useCallback((e: React.ChangeEvent<HTMLDivElement>) => {
    e.stopPropagation();

    updateTodo({ id, title: e.target.innerText });
  }, []);

  return (
    <Container
      placeholder="New Todo"
      ref={titleRef}
      onInput={onInputTitle}
      contentEditable={isDoubleClicked}
      suppressContentEditableWarning
    />
  );
};

export default Title;
