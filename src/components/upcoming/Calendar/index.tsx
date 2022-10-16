import { useCallback } from 'react';

import {
  Container,
  Header,
  DatesContainer,
  ArrowContainer,
  DaysContainer,
  Day,
  DateDiv,
  DateSpan,
  TodosContainer,
  TodoSpan,
} from './styles';
import { getYearMonth, getCalendarDates } from '@/shared/utils/date';
import { NEXTARROW, PREVARROW } from '@/components/common/Figure';
import { Todo } from '@/shared/types/todo';

const DAYS = 7;
const SUN = 0;
const SAT = 6;

interface CalendarProps {
  todos: Todo[];
  nowDate: Date;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Calendar: React.FC<CalendarProps> = ({ todos, nowDate, setNowDate }) => {
  const onDateClickHandler = useCallback(
    (year: number, month: number, dateTime: number) => {
      setNowDate(new Date(year, month, dateTime, nowDate.getHours(), nowDate.getMinutes()));
    },
    [nowDate]
  );

  const onPrevArrowClickHandler = useCallback(() => {
    setNowDate(
      new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() - 1,
        nowDate.getDate(),
        nowDate.getHours(),
        nowDate.getMinutes()
      )
    );
  }, [nowDate]);

  const onNextArrowClickHandler = useCallback(() => {
    setNowDate(
      new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() + 1,
        nowDate.getDate(),
        nowDate.getHours(),
        nowDate.getMinutes()
      )
    );
  }, [nowDate]);

  //같으면 true 다르면 false
  const dateDiff = useCallback((todoDate: string | undefined, value: { year: number; month: number; date: number }) => {
    if (!todoDate) return false;
    const newDate = new Date(todoDate);
    if (newDate.getFullYear() === value.year && newDate.getMonth() === value.month && newDate.getDate() === value.date)
      return true;
    else return false;
  }, []);

  return (
    <Container>
      <Header>
        <ArrowContainer onClick={onPrevArrowClickHandler}>
          <PREVARROW />
        </ArrowContainer>
        {getYearMonth(nowDate)}
        <ArrowContainer onClick={onNextArrowClickHandler}>
          <NEXTARROW />
        </ArrowContainer>
      </Header>
      <DaysContainer>
        <Day color="#FF6161">Sun</Day>
        <Day>Mon</Day>
        <Day>Tue</Day>
        <Day>Wed</Day>
        <Day>Thu</Day>
        <Day>Fri</Day>
        <Day color="#7380F6">Sat</Day>
      </DaysContainer>
      <DatesContainer>
        {getCalendarDates(nowDate).map((value, index) => {
          const selected = nowDate.getMonth() === value.month && nowDate.getDate() === value.date;
          const filteredTodos = todos.filter(
            (todo) => dateDiff(todo.alarmDate, value) || dateDiff(todo.dueDate, value)
          );
          const onClickHandler = () => {
            onDateClickHandler(value.year, value.month, value.date);
          };
          if (value.month != nowDate.getMonth())
            return (
              <DateDiv key={index} color="#c2c2c2" onClick={onClickHandler}>
                <DateSpan selected={selected}>{value.date}</DateSpan>
                <TodosContainer>
                  {filteredTodos.map((todo) => (
                    <TodoSpan>• {todo.title}</TodoSpan>
                  ))}
                </TodosContainer>
              </DateDiv>
            );
          else if (index % DAYS == SUN)
            return (
              <DateDiv key={index} color="#FF6161" onClick={onClickHandler}>
                <DateSpan selected={selected}>{value.date}</DateSpan>
                <TodosContainer>
                  {filteredTodos.map((todo) => (
                    <TodoSpan>• {todo.title}</TodoSpan>
                  ))}
                </TodosContainer>
              </DateDiv>
            );
          else if (index % DAYS == SAT)
            return (
              <DateDiv key={index} color="#7380F6" onClick={onClickHandler}>
                <DateSpan selected={selected}>{value.date}</DateSpan>
                <TodosContainer>
                  {filteredTodos.map((todo) => (
                    <TodoSpan>• {todo.title}</TodoSpan>
                  ))}
                </TodosContainer>
              </DateDiv>
            );
          else
            return (
              <DateDiv key={index} onClick={onClickHandler}>
                <DateSpan selected={selected}>{value.date}</DateSpan>
                <TodosContainer>
                  {filteredTodos.map((todo) => (
                    <TodoSpan>• {todo.title}</TodoSpan>
                  ))}
                </TodosContainer>
              </DateDiv>
            );
        })}
      </DatesContainer>
    </Container>
  );
};

export default Calendar;
