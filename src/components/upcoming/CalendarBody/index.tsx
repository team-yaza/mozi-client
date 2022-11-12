import React from 'react';
import { Todo } from '@/shared/types/todo';
import { getCalendarDates } from '@/shared/utils/date';
import { Container, DatesContainer, DateContainer, DateNumber, TodosContainer, TodoTitle } from './styles';

interface CalendarBodyProps {
  todos: Todo[];
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DAYS = 7;
const SUN = 0;
const SAT = 6;

const CalendarBody: React.FC<CalendarBodyProps> = ({ todos, currentDate, setCurrentDate }) => {
  const dateDiff = (todoDate: string | undefined, value: { year: number; month: number; date: number }) => {
    if (!todoDate) return false;
    const newDate = new Date(todoDate);
    if (newDate.getFullYear() === value.year && newDate.getMonth() === value.month && newDate.getDate() === value.date)
      return true;
    else return false;
  };

  const onDateClickHandler = (year: number, month: number, dateTime: number) => {
    setCurrentDate(new Date(year, month, dateTime));
  };

  return (
    <Container>
      <DatesContainer>
        {getCalendarDates(currentDate).map((value, index) => {
          const selected = currentDate.getMonth() === value.month && currentDate.getDate() === value.date;
          const filteredTodos = todos.filter(
            (todo) => dateDiff(todo.alarmDate, value) || dateDiff(todo.dueDate, value)
          );
          filteredTodos;
          index;

          if (value.month != currentDate.getMonth()) {
            return (
              <DateContainer
                key={index}
                color="#c2c2c2"
                onClick={() => onDateClickHandler(value.year, value.month, value.date)}
              >
                <DateNumber selected={selected}>{value.date}</DateNumber>
                <TodosContainer>
                  {filteredTodos
                    .filter((todo) => todo.title)
                    .map((todo) => (
                      <TodoTitle>• {todo.title}</TodoTitle>
                    ))}
                </TodosContainer>
              </DateContainer>
            );
          } else if (index % DAYS == SUN) {
            return (
              <DateContainer
                key={index}
                color="#FF6161"
                onClick={() => onDateClickHandler(value.year, value.month, value.date)}
              >
                <DateNumber selected={selected}>{value.date}</DateNumber>
                <TodosContainer>
                  {filteredTodos
                    .filter((todo) => todo.title)
                    .map((todo) => (
                      <TodoTitle>• {todo.title}</TodoTitle>
                    ))}
                </TodosContainer>
              </DateContainer>
            );
          } else if (index % DAYS == SAT) {
            return (
              <DateContainer
                key={index}
                color="#7380F6"
                onClick={() => onDateClickHandler(value.year, value.month, value.date)}
              >
                <DateNumber selected={selected}>{value.date}</DateNumber>
                <TodosContainer>
                  {filteredTodos
                    .filter((todo) => todo.title)
                    .map((todo) => (
                      <TodoTitle>• {todo.title}</TodoTitle>
                    ))}
                </TodosContainer>
              </DateContainer>
            );
          } else {
            return (
              <DateContainer key={index} onClick={() => onDateClickHandler(value.year, value.month, value.date)}>
                <DateNumber selected={selected}>{value.date}</DateNumber>
                <TodosContainer>
                  {filteredTodos
                    .filter((todo) => todo.title)
                    .map((todo) => (
                      <TodoTitle>• {todo.title}</TodoTitle>
                    ))}
                </TodosContainer>
              </DateContainer>
            );
          }
        })}
      </DatesContainer>
    </Container>
  );
};

export default React.memo(CalendarBody);
