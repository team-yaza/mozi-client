import { useEffect, useRef } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { TodoUpdateRequest } from '@/shared/types/todo';
import { debounce } from '@/shared/utils/debounce';
import { Container } from './styles';

interface DescriptionProps {
  id: string;
  description?: string;
  setIsDoubleClicked: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<unknown, unknown, TodoUpdateRequest, unknown>;
}

const Description: React.FC<DescriptionProps> = ({ id, description = '', setIsDoubleClicked, updateTodo }) => {
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current && description) descriptionRef.current.innerText = description;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setIsDoubleClicked(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const debouncedUpdateTodo = debounce((e: React.ChangeEvent<HTMLDivElement>) => {
    updateTodo({ id, description: e.target.innerText });
  }, 300);

  const onInputDescription = (e: React.ChangeEvent<HTMLDivElement>) => {
    e.stopPropagation();
    debouncedUpdateTodo(e);
  };

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
