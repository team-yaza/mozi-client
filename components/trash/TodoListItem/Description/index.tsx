import { useCallback, useEffect, useRef } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { TodoUpdateRequest } from '@/shared/types/todo';
import { Container } from './styles';

interface DescriptionProps {
  id: string;
  description?: string;
  updateTodo: UseMutateFunction<any, unknown, TodoUpdateRequest, unknown>;
}

const Description: React.FC<DescriptionProps> = ({ id, description = '', updateTodo }) => {
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current && description) {
      descriptionRef.current.innerText = description;
    }
  }, []);

  const onInputDescription = useCallback((e: React.ChangeEvent<HTMLDivElement>) => {
    e.stopPropagation();

    updateTodo({ id, description: e.target.innerText });
  }, []);

  return (
    <Container
      placeholder="Notes"
      ref={descriptionRef}
      // isDoubleClicked={isDoubleClicked}
      onInput={onInputDescription}
      contentEditable
      suppressContentEditableWarning
    ></Container>
  );
};

export default Description;
