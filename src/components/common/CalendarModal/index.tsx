import { useCallback, useState } from 'react';
import {
  Container,
  Header,
  DatesContainer,
  ArrowContainer,
  DaysContainer,
  Day,
  DateDiv,
  StopWatchContainer,
  TimeContainer,
  Footer,
  MeridiemContainer,
  HourInput,
  MinuteInput,
} from './styles';
import { getYearMonth, getCalendarDates } from '@/shared/utils/date';
import { NEXTARROW, PREVARROW, STOPWATCH } from '@/components/common/Figure';

interface CalendarModalProps {
  date: Date;
}
const HOURS = 12;
const DAYHOURS = 24;
const DAYS = 7;
const SUN = 0;
const SAT = 6;

const CalendarModal: React.FC<CalendarModalProps> = ({ date }) => {
  const [nowDate, setNowDate] = useState(date);

  const onMeridiemToggle = useCallback(() => {
    const nowHour = nowDate.getHours();
    const newHour = nowHour >= HOURS ? nowHour - HOURS : nowHour + HOURS;
    setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), newHour, nowDate.getMinutes()));
  }, [nowDate]);

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
                {value.date}
              </DateDiv>
            );
          else if (index % DAYS == SUN)
            return (
              <DateDiv key={index} selected={selected} color="#FF6161" onClick={onClickHandler}>
                {value.date}
              </DateDiv>
            );
          else if (index % DAYS == SAT)
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
      <Footer>
        <StopWatchContainer>
          <STOPWATCH />
        </StopWatchContainer>
        <TimeContainer>
          <MeridiemContainer onClick={onMeridiemToggle}>
            {nowDate.getHours() < HOURS ? '오전' : '오후'}
          </MeridiemContainer>
          <HourInput type="number" defaultValue={(nowDate.getHours() + DAYHOURS) % HOURS || HOURS} />
          {':'}
          <MinuteInput type="number" defaultValue={nowDate.getMinutes()} />
        </TimeContainer>
      </Footer>
    </Container>
  );
};

export default CalendarModal;
