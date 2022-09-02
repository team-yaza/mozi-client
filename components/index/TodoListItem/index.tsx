import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import MapModal from '@/components/index/TodoMap';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { useOnClickOutside } from '@/hooks/useOnClickOutside/index';
import { CALENDAR, DEADLINE, PLACE, TODOTAG } from '@/components/common/Figure';
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
  ChipListContainer,
} from './styles';
import ChipList from '@/components/common/ChipList';
import { ChipProps } from '@/components/common/ChipList/Chip';
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
  const [isTodoMapOpen, setIsTodoMapOpen] = useState(false);
  const [chipChildren, setChipChildren] = useState<ChipProps[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef && titleRef.current && title) {
      titleRef.current.innerText = title;
    }

    if (descriptionRef && descriptionRef.current && description) {
      descriptionRef.current.innerText = description;
    }
  }, []);

  useEffect(() => {
    if (!location || !location.name) {
      return;
    }
    setChipChildren([
      {
        type: 'location',
        fontColor: '#585858',
        backgroundColor: '#F5F5F5',
        children: <PLACE fill="#92909F" />,
        content: location.name,
        onClickHandler: () => setIsTodoMapOpen((oldState) => !oldState),
      },
    ]);
  }, [location]);

  const onClickOutsideHandler = useCallback(() => {
    setIsDoubleClicked(false);
    setIsTodoMapOpen(false);
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
      {!isDoubleClicked ? (
        <ChipListContainer>
          <ChipList align="row" ChipChildren={chipChildren} />
        </ChipListContainer>
      ) : (
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
          <ChipList align="column" ChipChildren={chipChildren} />

          <OptionsContainer>
            {!location?.name && (
              <OptionContainer onClick={() => setIsTodoMapOpen(!isTodoMapOpen)}>
                <PLACE stroke="#585858" />
              </OptionContainer>
            )}
            <OptionContainer onClick={() => 1}>
              <CALENDAR stroke="#585858" />
            </OptionContainer>
            <OptionContainer onClick={() => 2}>
              <TODOTAG stroke="#585858" />
            </OptionContainer>
            <OptionContainer onClick={() => 3}>
              <DEADLINE stroke="#585858" />
            </OptionContainer>
          </OptionsContainer>
        </>
      )}
      {isTodoMapOpen && (
        <MapModal id={id} location={location} onUpdateTodo={onUpdateTodo} setIsTodoMapOpen={setIsTodoMapOpen} />
      )}
    </Container>
  );
};

export default React.memo(TodoListItem);
