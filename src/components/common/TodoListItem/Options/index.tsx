import { useCallback, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { TodoUpdateRequest } from '@/shared/types/todo';
import { dateToString } from '@/shared/utils/date';
import { Container, DefinedContainer, DefinedOption, UndefinedContainer, UndefinedOption } from './styles';
import Chip from '@/components/common/Chip';
import { PLACE, CALENDAR, DEADLINE } from '@/components/common/Figure';
import LocationDeleteModal from '@/components/common/LocationDeleteModal';
import CalendarModal from '@/components/common/CalendarModal';

interface OptionsProps {
  id: string;
  locationName?: string;
  alarmDate?: string;
  dueDate?: string;
  setIsMapOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<any, unknown, TodoUpdateRequest, unknown>;
}

const Options: React.FC<OptionsProps> = ({ id, locationName, alarmDate, dueDate, setIsMapOpened, updateTodo }) => {
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);
  const [calendarState, setCalendarState] = useState<'alarm' | 'deadline'>('alarm');

  const onClickMap = useCallback(() => {
    setIsMapOpened((prevState) => !prevState);
  }, []);

  const onClickCalendar = useCallback(
    (type: 'alarm' | 'deadline') => {
      setCalendarState(type);
      setIsCalendarModalOpen((prevState) => !prevState);
    },
    [calendarState]
  );

  const getDate = useCallback((date: undefined | string) => (date ? new Date(date) : new Date()), []);

  const onDeleteHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsMapModalOpen((old) => !old);
  }, []);

  return (
    <Container>
      <DefinedContainer>
        {locationName && (
          <DefinedOption>
            <Chip
              type="location"
              Icon={<PLACE focused={false} />}
              content={locationName}
              backgroundColor="#F5F5F5"
              fontColor="#585858"
              onClickHandler={onClickMap}
              onDeleteHander={onDeleteHandler}
            />
          </DefinedOption>
        )}
        {alarmDate && (
          <DefinedOption>
            <Chip
              type="location"
              Icon={<CALENDAR />}
              content={dateToString(getDate(alarmDate))}
              backgroundColor="#F5F5F5"
              fontColor="#585858"
              onClickHandler={() => onClickCalendar('alarm')}
            />
          </DefinedOption>
        )}
        {dueDate && (
          <DefinedOption>
            <Chip
              type="deadline"
              Icon={<DEADLINE />}
              content={dateToString(getDate(dueDate))}
              backgroundColor="#F5F5F5"
              fontColor="#585858"
              onClickHandler={() => onClickCalendar('deadline')}
            />
          </DefinedOption>
        )}
      </DefinedContainer>
      <UndefinedContainer>
        {!locationName && (
          <UndefinedOption onClick={onClickMap}>
            <PLACE focused={true} />
          </UndefinedOption>
        )}
        {!alarmDate && (
          <UndefinedOption onClick={() => onClickCalendar('alarm')}>
            <CALENDAR />
          </UndefinedOption>
        )}
        {!dueDate && (
          <UndefinedOption onClick={() => onClickCalendar('deadline')}>
            <DEADLINE />
          </UndefinedOption>
        )}
      </UndefinedContainer>

      <LocationDeleteModal id={id} isOpened={isMapModalOpen} updateTodo={updateTodo} setIsOpened={setIsMapModalOpen} />

      <CalendarModal
        id={id}
        isCalendarModalOpen={isCalendarModalOpen}
        updateTodo={updateTodo}
        setIsCalendarModalOpen={setIsCalendarModalOpen}
        type={calendarState}
        date={calendarState === 'alarm' ? getDate(alarmDate) : getDate(dueDate)}
      />
    </Container>
  );
};

export default Options;
