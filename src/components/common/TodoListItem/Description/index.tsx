import { useCallback, useEffect, useRef } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { TodoUpdateRequest } from '@/shared/types/todo';
import { Container } from './styles';
import { debounce } from '@/shared/utils/debounce/index';

interface DescriptionProps {
  id: string;
  description?: string;
  updateTodo: UseMutateFunction<unknown, unknown, TodoUpdateRequest, unknown>;
}

const Description: React.FC<DescriptionProps> = ({ id, description = '', updateTodo }) => {
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current && description) {
      descriptionRef.current.innerText = description;
    }
  }, []);

  const debouncedUpdateTodo = debounce((e: React.ChangeEvent<HTMLDivElement>) => {
    updateTodo({ id, description: e.target.innerText });
  }, 300);

  const onInputDescription = useCallback((e: React.ChangeEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // updateTodo({ id, description: e.target.innerText });
    debouncedUpdateTodo(e);
  }, []);

  return (
    <Container
      placeholder="Notes"
      ref={descriptionRef}
      onInput={onInputDescription}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
    />
  );
};

export default Description;
