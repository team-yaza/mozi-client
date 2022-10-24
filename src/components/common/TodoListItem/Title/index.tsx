import React, { useEffect, useRef, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { debounce } from '@/shared/utils/debounce';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { Container } from './styles';

interface TitleProps {
  id: string;
  title?: string;
  isDoubleClicked: boolean;
  updateTodo: UseMutateFunction<unknown, unknown, TodoUpdateRequest, unknown>;
}

const Title: React.FC<TitleProps> = ({ id, title = '', isDoubleClicked, updateTodo }) => {
  const [editable, setEditable] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && title) {
      titleRef.current.innerText = title;
    }
    // 의존성 배열 비워서 title이 자동으로 업데이트되지 않도록 해야함
  }, []);

  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, [isDoubleClicked]);

  const debouncedUpdateTodo = debounce((e: React.ChangeEvent<HTMLDivElement>) => {
    updateTodo({ id, title: e.target.innerText });
  }, 300);

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setEditable(true);
    setTimeout(() => titleRef.current?.focus(), 0);
  };

  const onInputTitle = (e: React.ChangeEvent<HTMLDivElement>) => {
    e.stopPropagation();
    debouncedUpdateTodo(e);
  };

  return (
    <Container
      placeholder="New Todo"
      ref={titleRef}
      onInput={onInputTitle}
      onClick={onClickHandler}
      contentEditable={editable || isDoubleClicked}
      suppressContentEditableWarning
      spellCheck={false}
    />
  );
};

export default Title;
