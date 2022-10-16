import { useCallback } from 'react';

import { Container, Header, DatesContainer, ArrowContainer, DaysContainer, Day, DateDiv } from './styles';
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

const Calendar: React.FC<CalendarProps> = ({ nowDate, setNowDate }) => {
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
          const onClickHandler = () => {
            onDateClickHandler(value.year, value.month, value.date);
          };
          if (value.month != nowDate.getMonth())
            return (
              <DateDiv key={index} selected={selected} color="#c2c2c2" onClick={onClickHandler}>
                <span>{value.date}</span>
              </DateDiv>
            );
          else if (index % DAYS == SUN)
            return (
              <DateDiv key={index} selected={selected} color="#FF6161" onClick={onClickHandler}>
                <span>{value.date}</span>
              </DateDiv>
            );
          else if (index % DAYS == SAT)
            return (
              <DateDiv key={index} selected={selected} color="#7380F6" onClick={onClickHandler}>
                <span>{value.date}</span>
              </DateDiv>
            );
          else
            return (
              <DateDiv key={index} selected={selected} onClick={onClickHandler}>
                <span>{value.date}</span>
              </DateDiv>
            );
        })}
      </DatesContainer>
    </Container>
  );
};

export default Calendar;
