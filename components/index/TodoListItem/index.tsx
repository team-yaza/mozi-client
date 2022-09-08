import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import TodoMap from '@/components/index/TodoMap';
import TodoCalendar from '@/components/index/todoCalendar';
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
  OptionWrapper,
  ChipContainer,
} from './styles';
import ChipList from '@/components/common/ChipList';
import { ChipProps } from '@/components/common/ChipList/Chip';
import { GeoJson } from '@/shared/types/location';
import dateToString from '@/shared/utils/dateToString';

interface TodoListItemProps {
  id: string;
  title?: string;
  done: boolean;
  description?: string;
  location?: GeoJson;
  date?: Date | string;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: ({ id, title, done, longitude, latitude, description, date }: TodoUpdateRequest) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  id,
  title,
  description,
  done,
  location,
  date,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  // const [checked, setChecked] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isTodoMapOpen, setIsTodoMapOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
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
    setChipChildren((oldChildren) => oldChildren.filter((chip) => chip.type !== 'location'));

    if (!location || !location.name) return;

    const onChipClickedHander = () => {
      if (!isDoubleClicked) return;
      setIsTodoMapOpen((oldState) => !oldState);
    };

    setChipChildren((oldChildren) => [
      {
        type: 'location',
        fontColor: '#585858',
        backgroundColor: '#F5F5F5',
        Icon: <PLACE fill="#92909F" />,
        content: location.name,
        onClickHandler: onChipClickedHander,
      },
      ...oldChildren,
    ]);
  }, [location, isDoubleClicked]);

  useEffect(() => {
    setChipChildren((oldChildren) => oldChildren.filter((chip) => chip.type !== 'date'));

    if (typeof date === 'undefined') return;

    setChipChildren((oldChildren) => [
      {
        type: 'date',
        fontColor: '#585858',
        backgroundColor: '#F5F5F5',
        Icon: <CALENDAR stroke="#92909F" />,
        Modal: <TodoCalendar />,
        isModalOpen: isCalendarOpen,
        content: dateToString(date),
      },
      ...oldChildren,
    ]);
  }, [date, isCalendarOpen]);

  const onClickOutsideHandler = useCallback(() => {
    setIsDoubleClicked(false);
    setIsTodoMapOpen(false);
    setIsCalendarOpen(false);
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

  const onCalendarClickHandler = useCallback(() => {
    const now = new Date();
    onUpdateTodo({ id, date: now });
    setIsCalendarOpen((oldState) => !oldState);
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
          <OptionWrapper>
            <ChipContainer>
              <ChipList align="column" ChipChildren={chipChildren} />
            </ChipContainer>

            <OptionsContainer>
              {!location?.name && (
                <OptionContainer onClick={() => setIsTodoMapOpen(!isTodoMapOpen)}>
                  <PLACE stroke="#585858" />
                </OptionContainer>
              )}
              {!date && (
                <OptionContainer onClick={onCalendarClickHandler}>
                  <CALENDAR stroke="#585858" />
                </OptionContainer>
              )}
              <OptionContainer onClick={() => 2}>
                <TODOTAG stroke="#585858" />
              </OptionContainer>
              <OptionContainer onClick={() => 3}>
                <DEADLINE stroke="#585858" />
              </OptionContainer>
            </OptionsContainer>
          </OptionWrapper>
        </>
      )}
      {isTodoMapOpen && (
        <TodoMap id={id} location={location} onUpdateTodo={onUpdateTodo} setIsTodoMapOpen={setIsTodoMapOpen} />
      )}
    </Container>
  );
};

export default React.memo(TodoListItem);
