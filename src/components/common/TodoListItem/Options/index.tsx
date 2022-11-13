import { useCallback, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

// import { TodoUpdateRequest } from '@/shared/types/todo';
import { dateToString } from '@/shared/utils/date';
import { Container, DefinedContainer, DefinedOption, UndefinedContainer, UndefinedOption } from './styles';
import { Chip, CalendarModal } from '@/components/common';
import { PLACE, CALENDAR, DEADLINE, ALARM } from '@/components/common/Figure';
import DeleteModal from '@/components/common/DeleteModal';
import { Todo } from '@/shared/types/todo';

interface OptionsProps {
  todo: Todo;
  setIsMapOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<unknown, unknown, unknown, unknown>;
}

const Options: React.FC<OptionsProps> = ({ todo, setIsMapOpened, updateTodo }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);
  const [CalendarModalState, setCalendarModalState] = useState<'alarm' | 'due'>('alarm');
  const [deleteModalState, setDeleteModalState] = useState<'location' | 'alarm' | 'due'>('location');

  const onClickMap = () => setIsMapOpened((prevState) => !prevState);

  const onClickCalendar = (type: 'alarm' | 'due') => {
    setCalendarModalState(type);
    setIsCalendarModalOpen((prevState) => !prevState);
  };

  const getDate = (date: undefined | string) => (date ? new Date(date) : new Date());

  const onDeleteLocationHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setDeleteModalState('location');
      setIsDeleteModalOpen((old) => !old);
    },
    [setDeleteModalState, setIsDeleteModalOpen]
  );

  const onDeleteAlarmDateHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setDeleteModalState('alarm');
    setIsDeleteModalOpen((old) => !old);
  };

  const onDeleteDueDateHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setDeleteModalState('due');
    setIsDeleteModalOpen((old) => !old);
  };

  return (
    <Container>
      <DefinedContainer>
        {todo.locationName && (
          <DefinedOption>
            <Chip
              type="location"
              icon={<PLACE />}
              content={todo.locationName}
              backgroundColor="#F5F5F5"
              fontColor="#585858"
              onClickHandler={onClickMap}
              onDeleteHander={onDeleteLocationHandler}
            />
          </DefinedOption>
        )}
        {todo.alarmDate && (
          <DefinedOption>
            <Chip
              type="date"
              icon={<CALENDAR />}
              content={dateToString(getDate(todo.alarmDate))}
              backgroundColor="#F5F5F5"
              fontColor="#585858"
              onClickHandler={() => onClickCalendar('alarm')}
              onDeleteHander={onDeleteAlarmDateHandler}
            />
          </DefinedOption>
        )}
        {todo.dueDate && (
          <DefinedOption>
            <Chip
              type="deadline"
              icon={<DEADLINE />}
              content={dateToString(getDate(todo.dueDate))}
              backgroundColor="#F5F5F5"
              fontColor="#585858"
              onClickHandler={() => onClickCalendar('due')}
              onDeleteHander={onDeleteDueDateHandler}
            />
          </DefinedOption>
        )}
      </DefinedContainer>

      <UndefinedContainer>
        {!todo.locationName && (
          <UndefinedOption onClick={onClickMap} data-testid="todoMap">
            <PLACE />
          </UndefinedOption>
        )}
        {!todo.alarmDate && (
          <UndefinedOption onClick={() => onClickCalendar('alarm')}>
            <CALENDAR />
          </UndefinedOption>
        )}
        {!todo.dueDate && (
          <UndefinedOption onClick={() => onClickCalendar('due')}>
            <DEADLINE />
          </UndefinedOption>
        )}
        <UndefinedOption style={{ marginLeft: '-0.2rem' }}>
          <ALARM />
        </UndefinedOption>
      </UndefinedContainer>

      <DeleteModal
        todo={todo}
        type={deleteModalState}
        isOpened={isDeleteModalOpen}
        updateTodo={updateTodo}
        setIsOpened={setIsDeleteModalOpen}
      />

      <CalendarModal
        todo={todo}
        isCalendarModalOpen={isCalendarModalOpen}
        updateTodo={updateTodo}
        setIsCalendarModalOpen={setIsCalendarModalOpen}
        type={CalendarModalState}
        date={CalendarModalState === 'alarm' ? getDate(todo.alarmDate) : getDate(todo.dueDate)}
      />
    </Container>
  );
};

export default Options;
