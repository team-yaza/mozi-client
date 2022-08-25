import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import MapModal from '@/components/index/MapModal';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { useOnClickOutside } from '@/hooks/useOnClickOutside/index';
import { CALENDAR, DEADLINE, PLACE, TAG } from '@/components/common/Figure';
import {
  CheckBox,
  Container,
  TitleContainer,
  Title,
  DescriptionContainer,
  Description,
  SubTaskContainer,
  OptionContainer,
  OptionsContainer,
} from './styles';
import { GeoJson } from '@/shared/types/location';

interface TodoListItemProps {
  id: string;
  title?: string;
  done: boolean;
  description?: string;
  location?: GeoJson;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: ({ id, title, done, longitude, latitude, description }: TodoUpdateRequest) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  id,
  title,
  description,
  done,
  location,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  // const [checked, setChecked] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef && titleRef.current && title) {
      titleRef.current.innerText = title;
    }

    if (descriptionRef && descriptionRef.current && description) {
      descriptionRef.current.innerText = description;
    }
  }, []);

  const onClickOutsideHandler = useCallback(() => {
    setIsDoubleClicked(false);
    setIsModalOpen(false);
    setFocused(false);
  }, []);

  useOnClickOutside(containerRef, onClickOutsideHandler);

  const onInputTitle = useCallback((e: React.ChangeEvent<HTMLDivElement>) => {
    e.stopPropagation();

    onUpdateTodo({ id, title: e.target.innerText });
  }, []);

  const onInputDescription = useCallback((e: React.ChangeEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onUpdateTodo({ id, description: e.target.innerText });
  }, []);

  const onEnterKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      e.target.blur();
      onClickOutsideHandler();
    }
  }, []);

  const onDeleteKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        if (focused && !isDoubleClicked) onDeleteTodo(id);
      }
    },
    [focused, isDoubleClicked]
  );

  const onCheckHandler = useCallback((done: boolean) => {
    onUpdateTodo({ id, done: !done });
  }, []);

  const onDoubleClickHandler = useCallback(() => {
    setFocused(false);
    setIsDoubleClicked(true);
  }, []);

  const onClickHander = useCallback(() => {
    setFocused(true);
  }, []);

  return (
    <Container
      tabIndex={0}
      isDoubleClicked={isDoubleClicked}
      focused={focused}
      onDoubleClick={onDoubleClickHandler}
      onClick={onClickHander}
      onKeyDown={onDeleteKeyDown}
      ref={containerRef}
    >
      <TitleContainer>
        <CheckBox onClick={() => onCheckHandler(done)}>
          {done && <Image src="/assets/svgs/check.svg" layout="fill" />}
        </CheckBox>
        <Title
          ref={titleRef}
          placeholder="New Todo"
          contentEditable={isDoubleClicked}
          suppressContentEditableWarning
          onInput={onInputTitle}
          onKeyDown={onEnterKeyDown}
          spellCheck={false}
        />
      </TitleContainer>
      {isDoubleClicked && (
        <>
          <DescriptionContainer>
            <Description
              ref={descriptionRef}
              placeholder="Notes"
              contentEditable
              suppressContentEditableWarning
              onInput={onInputDescription}
              onKeyUp={onEnterKeyDown}
              spellCheck={false}
            />
          </DescriptionContainer>

          <SubTaskContainer></SubTaskContainer>

          <OptionsContainer>
            <OptionContainer onClick={() => setIsModalOpen(!isModalOpen)}>
              <PLACE stroke="#585858" />
            </OptionContainer>
            <OptionContainer onClick={() => 1}>
              <CALENDAR stroke="#585858" />
            </OptionContainer>
            <OptionContainer onClick={() => 2}>
              <TAG stroke="#585858" />
            </OptionContainer>
            <OptionContainer onClick={() => 3}>
              <DEADLINE stroke="#585858" />
            </OptionContainer>
          </OptionsContainer>
        </>
      )}
      {isModalOpen && (
        <MapModal id={id} location={location} onUpdateTodo={onUpdateTodo} setIsModalOpen={setIsModalOpen} />
      )}
    </Container>
  );
};

export default React.memo(TodoListItem);
