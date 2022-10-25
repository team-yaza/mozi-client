import { useCallback, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { TodoUpdateRequest } from '@/shared/types/todo';
import { dateToString } from '@/shared/utils/date';
import { Container, DefinedContainer, DefinedOption, UndefinedContainer, UndefinedOption } from './styles';
import { Chip, CalendarModal } from '@/components/common';
import { PLACE, CALENDAR, DEADLINE } from '@/components/common/Figure';
import DeleteModal from '@/components/common/DeleteModal';

interface OptionsProps {
  id: string;
  locationName?: string;
  alarmDate?: string;
  dueDate?: string;
  setIsMapOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<unknown, unknown, TodoUpdateRequest, unknown>;
}

const Options: React.FC<OptionsProps> = ({ id, locationName, alarmDate, dueDate, setIsMapOpened, updateTodo }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);
  const [CalendarModalState, setCalendarModalState] = useState<'alarm' | 'due'>('alarm');
  const [deleteModalState, setDeleteModalState] = useState<'location' | 'alarm' | 'due'>('location');

  const onClickMap = useCallback(() => {
    setIsMapOpened((prevState) => !prevState);
  }, []);

  const onClickCalendar = useCallback((type: 'alarm' | 'due') => {
    setCalendarModalState(type);
    setIsCalendarModalOpen((prevState) => !prevState);
  }, []);

  const getDate = useCallback((date: undefined | string) => (date ? new Date(date) : new Date()), []);

  const onDeleteLocationHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setDeleteModalState('location');
      setIsDeleteModalOpen((old) => !old);
    },
    [setDeleteModalState, setIsDeleteModalOpen]
  );

  const onDeleteAlarmDateHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setDeleteModalState('alarm');
      setIsDeleteModalOpen((old) => !old);
    },
    [setDeleteModalState, setIsDeleteModalOpen]
  );

  const onDeleteDueDateHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setDeleteModalState('due');
      setIsDeleteModalOpen((old) => !old);
    },
    [setDeleteModalState, setIsDeleteModalOpen]
  );

  return (
    <Container>
      <DefinedContainer>
        {locationName && (
          <DefinedOption>
            <Chip
              type="location"
              icon={<PLACE />}
              content={locationName}
              backgroundColor="#F5F5F5"
              fontColor="#585858"
              onClickHandler={onClickMap}
              onDeleteHander={onDeleteLocationHandler}
            />
          </DefinedOption>
        )}
        {alarmDate && (
          <DefinedOption>
            <Chip
              type="date"
              icon={<CALENDAR />}
              content={dateToString(getDate(alarmDate))}
              backgroundColor="#F5F5F5"
              fontColor="#585858"
              onClickHandler={() => onClickCalendar('alarm')}
              onDeleteHander={onDeleteAlarmDateHandler}
            />
          </DefinedOption>
        )}
        {dueDate && (
          <DefinedOption>
            <Chip
              type="deadline"
              icon={<DEADLINE />}
              content={dateToString(getDate(dueDate))}
              backgroundColor="#F5F5F5"
              fontColor="#585858"
              onClickHandler={() => onClickCalendar('due')}
              onDeleteHander={onDeleteDueDateHandler}
            />
          </DefinedOption>
        )}
      </DefinedContainer>

      <UndefinedContainer>
        {!locationName && (
          <UndefinedOption onClick={onClickMap}>
            <PLACE />
          </UndefinedOption>
        )}
        {!alarmDate && (
          <UndefinedOption onClick={() => onClickCalendar('alarm')}>
            <CALENDAR />
          </UndefinedOption>
        )}
        {!dueDate && (
          <UndefinedOption onClick={() => onClickCalendar('due')}>
            <DEADLINE />
          </UndefinedOption>
        )}
      </UndefinedContainer>

      <DeleteModal
        type={deleteModalState}
        id={id}
        isOpened={isDeleteModalOpen}
        updateTodo={updateTodo}
        setIsOpened={setIsDeleteModalOpen}
      />

      <CalendarModal
        id={id}
        isCalendarModalOpen={isCalendarModalOpen}
        updateTodo={updateTodo}
        setIsCalendarModalOpen={setIsCalendarModalOpen}
        type={CalendarModalState}
        date={CalendarModalState === 'alarm' ? getDate(alarmDate) : getDate(dueDate)}
      />
    </Container>
  );
};

export default Options;
