import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

import { CheckBox, Container, DeleteButton } from './styles';
import { Todo } from '@/shared/types/todo';

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: ({ id, title }: { id: string; title: string }) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onDeleteTodo, onUpdateTodo }) => {
  const [checked, setChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onUpdateTodo({ id: todo._id, title: e.target.value });
  }, []);

  const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') inputRef.current?.blur();
  }, []);

  const onCheckHandler = useCallback(() => {
    setChecked((prevCheckedState) => !prevCheckedState);
  }, []);

  return (
    <Container>
      <CheckBox onClick={onCheckHandler}>{checked && <Image src="/assets/svgs/check.svg" layout="fill" />}</CheckBox>
      <input
        autoFocus
        type="text"
        ref={inputRef}
        placeholder="New Todo"
        defaultValue={todo.title}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      <DeleteButton onClick={() => onDeleteTodo(todo._id)}>삭제</DeleteButton>
    </Container>
  );
};

export default React.memo(TodoListItem);
