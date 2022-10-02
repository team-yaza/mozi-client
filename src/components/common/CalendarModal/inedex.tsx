import {
  Container,
  Header,
  DatesContainer,
  ArrowContainer,
  DaysContainer,
  Day,
  WeekContainer,
  DateDiv,
} from './styles';
import { getYearMonth } from '@/shared/utils/date';
import { getCalendarDates } from '@/shared/utils/date';
import { NEXTARROW, PREVARROW } from '@/components/common/Figure';

interface CalendarModalProps {
  date?: Date;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ date }) => {
  const a = getCalendarDates(date ? date : new Date());
  console.log(a);
  return (
    <Container>
      <Header>
        <ArrowContainer>
          <PREVARROW />
        </ArrowContainer>
        {date ? getYearMonth(date) : getYearMonth(new Date())}
        <ArrowContainer>
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
        <WeekContainer>
          <DateDiv>1</DateDiv>
          <DateDiv>2</DateDiv>
          <DateDiv>3</DateDiv>
          <DateDiv>4</DateDiv>
          <DateDiv>5</DateDiv>
          <DateDiv>6</DateDiv>
          <DateDiv>7</DateDiv>
        </WeekContainer>
        <WeekContainer>
          <DateDiv>1</DateDiv>
          <DateDiv>2</DateDiv>
          <DateDiv>3</DateDiv>
          <DateDiv>4</DateDiv>
          <DateDiv>5</DateDiv>
          <DateDiv>6</DateDiv>
          <DateDiv>7</DateDiv>
        </WeekContainer>
        <WeekContainer>
          <DateDiv>1</DateDiv>
          <DateDiv>2</DateDiv>
          <DateDiv>3</DateDiv>
          <DateDiv>4</DateDiv>
          <DateDiv>5</DateDiv>
          <DateDiv>6</DateDiv>
          <DateDiv>7</DateDiv>
        </WeekContainer>
        <WeekContainer>
          <DateDiv>1</DateDiv>
          <DateDiv>2</DateDiv>
          <DateDiv>3</DateDiv>
          <DateDiv>4</DateDiv>
          <DateDiv>5</DateDiv>
          <DateDiv>6</DateDiv>
          <DateDiv>7</DateDiv>
        </WeekContainer>
        <WeekContainer>
          <DateDiv>1</DateDiv>
          <DateDiv>2</DateDiv>
          <DateDiv>3</DateDiv>
          <DateDiv>4</DateDiv>
          <DateDiv>5</DateDiv>
          <DateDiv>6</DateDiv>
          <DateDiv>7</DateDiv>
        </WeekContainer>
        <WeekContainer>
          <DateDiv>1</DateDiv>
          <DateDiv>2</DateDiv>
          <DateDiv>3</DateDiv>
          <DateDiv>4</DateDiv>
          <DateDiv>5</DateDiv>
          <DateDiv>6</DateDiv>
          <DateDiv>7</DateDiv>
        </WeekContainer>
      </DatesContainer>
    </Container>
  );
};

export default CalendarModal;
