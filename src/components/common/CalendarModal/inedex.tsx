import { useCallback, useState } from 'react';
import { Container, Header, DatesContainer, ArrowContainer, DaysContainer, Day, DateDiv } from './styles';
import { getYearMonth } from '@/shared/utils/date';
import { getCalendarDates } from '@/shared/utils/date';
import { NEXTARROW, PREVARROW } from '@/components/common/Figure';

interface CalendarModalProps {
  date: Date;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ date }) => {
  const [selectedDate, setSelectedDate] = useState(date);

  const onDateClickHandler = useCallback(
    (year: number, month: number, dateTime: number) => {
      setSelectedDate(new Date(year, month, dateTime));
    },
    [selectedDate]
  );

  const onPrevArrowClickHandler = useCallback(() => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, selectedDate.getDate()));
  }, [selectedDate]);

  const onNextArrowClickHandler = useCallback(() => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate()));
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <ArrowContainer onClick={onPrevArrowClickHandler}>
          <PREVARROW />
        </ArrowContainer>
        {getYearMonth(selectedDate)}
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
        {getCalendarDates(selectedDate).map((value, index) => {
          const selected = selectedDate.getMonth() === value.month && selectedDate.getDate() === value.date;
          const onClickHandler = () => {
            onDateClickHandler(value.year, value.month, value.date);
          };
          if (value.month != selectedDate.getMonth())
            return (
              <DateDiv key={index} selected={selected} color="#c2c2c2" onClick={onClickHandler}>
                {value.date}
              </DateDiv>
            );
          else if (index % 7 == 0)
            return (
              <DateDiv key={index} selected={selected} color="#FF6161" onClick={onClickHandler}>
                {value.date}
              </DateDiv>
            );
          else if (index % 7 == 6)
            return (
              <DateDiv key={index} selected={selected} color="#7380F6" onClick={onClickHandler}>
                {value.date}
              </DateDiv>
            );
          else
            return (
              <DateDiv key={index} selected={selected} onClick={onClickHandler}>
                {value.date}
              </DateDiv>
            );
        })}
      </DatesContainer>
    </Container>
  );
};

export default CalendarModal;
