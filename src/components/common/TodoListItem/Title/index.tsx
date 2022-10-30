import React, { useEffect, useRef, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { debounce } from '@/shared/utils/debounce';
// import { TodoUpdateRequest } from '@/shared/types/todo';
import { Container } from './styles';
import { Todo } from '@/shared/types/todo';

interface TitleProps {
  todo: Todo;
  isDoubleClicked: boolean;
  setIsDoubleClicked: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<unknown, unknown, unknown, unknown>;
}

const Title: React.FC<TitleProps> = ({ todo, isDoubleClicked, setIsDoubleClicked, updateTodo }) => {
  const [editable, setEditable] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && todo.title) {
      titleRef.current.innerText = todo.title;
    }
    // 의존성 배열 비워서 title이 자동으로 업데이트되지 않도록 해야함
  }, []);

  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, [isDoubleClicked]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setEditable(false);
        setIsDoubleClicked(false);
      }
    };

    if (editable) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editable, setEditable, setIsDoubleClicked]);

  const debouncedUpdateTodo = debounce((e: React.ChangeEvent<HTMLDivElement>) => {
    updateTodo({ ...todo, title: e.target.innerText });
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
