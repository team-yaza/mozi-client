import { useCallback, useRef, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { CheckBox, Container, IconContainer, MainContainer } from './styles';
// import { Title } from '../index';
import PLACE from '../Figure/PLACE';
import CALENDAR from '../Figure/CALENDAR';
import DEADLINE from '../Figure/DEADLINE';

interface TempProps {
  id: string;
  title?: string;
  description?: string;
  longitude?: number;
  latitude?: number;
  locationName?: string;
  alarmDate?: string;
  dueDate?: string;
  done: boolean;
  index: number;
  isFocused?: boolean;
  setIsFocused: (index: number) => void;
  updateTodo: UseMutateFunction<unknown, unknown, TodoUpdateRequest, unknown>;
  deleteTodo: UseMutateFunction<unknown, unknown, string, unknown>;
}

export default function Temp({
  // id,
  // title = '',
  description,
  index,
  latitude,
  longitude,
  locationName,
  alarmDate,
  dueDate,
  done,
  isFocused,
  setIsFocused,
  // updateTodo,
  deleteTodo,
}: TempProps) {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isMapOpened, setIsMapOpened] = useState(false);

  description;
  longitude;
  latitude;
  deleteTodo;
  isMapOpened;

  const containerRef = useRef<HTMLDivElement>(null);

  const onClickOutsideHandler = useCallback(() => {
    setIsFocused(-1);
    setIsMapOpened(false);
    setIsDoubleClicked(false);
  }, [setIsFocused, setIsMapOpened, setIsDoubleClicked]);

  useOnClickOutside(containerRef, onClickOutsideHandler);

  const onClickHandler = useCallback(() => {
    if (isDoubleClicked) return;

    setIsFocused(index);
  }, [index, setIsFocused, isDoubleClicked]);

  const onDoubleClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (document.getElementById('modal-root')?.contains(e.target as HTMLDivElement)) return;

    setIsFocused(-1);
    setIsMapOpened(false);
    setIsDoubleClicked((prevState) => !prevState);
  }, []);

  const onCheckHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      // setIsChecked((prevState) => !prevState);
      // debounce(() => updateTodo({ id, done: !done }), 500)();
    },
    [done]
  );

  return (
    <Container
      ref={containerRef}
      tabIndex={0}
      isFocused={isFocused}
      isDoubleClicked={isDoubleClicked}
      onClick={onClickHandler}
      onDoubleClick={onDoubleClickHandler}
    >
      {/* 클릭 안해도 보이는 부분 */}

      <MainContainer>
        <CheckBox checked={done} onClick={onCheckHandler} />
        {/* <Title id={id} title={title} isDoubleClicked={isDoubleClicked} updateTodo={updateTodo} /> */}
        {!isDoubleClicked && locationName && (
          <IconContainer>
            <PLACE focused={true} />
          </IconContainer>
        )}
        {!isDoubleClicked && alarmDate && (
          <IconContainer>
            <CALENDAR focused={true} />
          </IconContainer>
        )}
        {!isDoubleClicked && dueDate && (
          <IconContainer>
            <DEADLINE focused={true} />
          </IconContainer>
        )}
      </MainContainer>

      {/* 더블 클릭시 생기는 부분 */}

      {/* {isDoubleClicked && (
        <>
          <DescriptionContainer>
            <Description id={id} description={description} updateTodo={updateTodo} />
          </DescriptionContainer>
          <Options
            id={id}
            locationName={locationName}
            alarmDate={alarmDate}
            dueDate={dueDate}
            setIsMapOpened={setIsMapOpened}
            updateTodo={updateTodo}
          />
        </>
      )} */}

      {/* <Map /> */}

      {/* {isMapOpened && (
        <Map
          id={id}
          updateTodo={updateTodo}
          setIsMapOpened={setIsMapOpened}
          longitude={longitude}
          latitude={latitude}
        />
      )} */}
    </Container>
  );
}
