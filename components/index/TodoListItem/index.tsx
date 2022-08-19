import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import MapModal from '@/components/index/MapModal';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { UpdateAlarmProps } from '@/shared/types/alarm';
import { useOnClickOutside } from '@/hooks/useOnClickOutside/index';
import CALENDAR from '@/components/common/Figure/CALENDAR';
import DEADLINE from '@/components/common/Figure/DEADLINE';
import PLACE from '@/components/common/Figure/PLACE';
import TAG from '@/components/common/Figure/TAG';
import {
  CheckBox,
  Container,
  DeleteButton,
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
  description?: string;
  location?: GeoJson | undefined;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: ({ id, title, longitude, latitude, description }: TodoUpdateRequest) => void;
  onUpdateAlarm: ({ todoId, longitude, latitude, name, visited }: UpdateAlarmProps) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  id,
  title,
  description,
  location,
  onDeleteTodo,
  onUpdateTodo,
  onUpdateAlarm,
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState(false);
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

  const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') onClickOutsideHandler();
    else if (e.key === 'Escape') onClickOutsideHandler();
  }, []);

  const onCheckHandler = useCallback(() => {
    setChecked((prevCheckedState) => !prevCheckedState);
  }, []);

  const onDoubleClickHandler = useCallback(() => {
    setIsDoubleClicked(true);
  }, []);

  return (
    <Container isDoubleClicked={isDoubleClicked} onDoubleClick={onDoubleClickHandler} ref={containerRef}>
      <TitleContainer>
        <CheckBox onClick={onCheckHandler}>{checked && <Image src="/assets/svgs/check.svg" layout="fill" />}</CheckBox>
        <Title
          ref={titleRef}
          placeholder="New Todo"
          contentEditable
          suppressContentEditableWarning
          onInput={onInputTitle}
          onKeyUp={onKeyUp}
          onDoubleClick={onDoubleClickHandler}
          spellCheck={false}
        />
        <DeleteButton onClick={() => onDeleteTodo(id)}>삭제</DeleteButton> {/* ! 나중에 삭제 */}
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
              onKeyUp={onKeyUp}
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
        <MapModal
          id={id}
          location={location}
          onUpdateTodo={onUpdateTodo}
          setIsModalOpen={setIsModalOpen}
          onUpdateAlarm={onUpdateAlarm}
        />
      )}
    </Container>
  );
};

export default React.memo(TodoListItem);
