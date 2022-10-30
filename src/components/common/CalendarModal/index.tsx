import React, { useCallback, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import Modal from '@/components/common/Modal';

import { getYearMonth, getCalendarDates, getDateToHour, getDateToMin } from '@/shared/utils/date';
import { NEXTARROW, PREVARROW, STOPWATCH } from '@/components/common/Figure';
// import { TodoUpdateRequest } from '@/shared/types/todo';
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

interface CalendarModalProps {
  id: string;
  date: Date;
  type: 'alarm' | 'due';
  isCalendarModalOpen: boolean;
  setIsCalendarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<unknown, unknown, unknown, unknown>;
}

const HOURS = 12;
const DAYS = 7;
const SUN = 0;
const SAT = 6;

const CalendarModal: React.FC<CalendarModalProps> = ({
  id,
  type,
  date,
  isCalendarModalOpen,
  setIsCalendarModalOpen,
  updateTodo,
}) => {
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

  const onConfirmHandler = useCallback(() => {
    setIsCalendarModalOpen(false);
    if (type === 'alarm') updateTodo({ id, alarmDate: nowDate });
    else updateTodo({ id, dueDate: nowDate });
  }, [nowDate, type]);

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

  const onHourInputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value == '') return;
      const hour = nowDate.getHours() < HOURS ? Number(e.target.value) : Number(e.target.value) + 12;
      setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), hour, nowDate.getMinutes()));
    },
    [nowDate]
  );

  const onMinuteInputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value == '') return;
      setNowDate(
        new Date(
          nowDate.getFullYear(),
          nowDate.getMonth(),
          nowDate.getDate(),
          nowDate.getHours(),
          Number(e.target.value)
        )
      );
    },
    [nowDate]
  );

  return (
    <Modal isOpened={isCalendarModalOpen} onClose={() => setIsCalendarModalOpen(false)} onConfirm={onConfirmHandler}>
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
        <DatesContainer type={type}>
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
        {type === 'alarm' && (
          <Footer>
            <StopWatchContainer>
              <STOPWATCH />
            </StopWatchContainer>
            <TimeContainer>
              <MeridiemContainer onClick={onMeridiemToggle}>
                {nowDate.getHours() < HOURS ? '오전' : '오후'}
              </MeridiemContainer>
              <HourInput type="number" defaultValue={getDateToHour(nowDate)} onBlur={onHourInputHandler} />
              {':'}
              <MinuteInput type="number" defaultValue={getDateToMin(nowDate)} onBlur={onMinuteInputHandler} />
            </TimeContainer>
          </Footer>
        )}
      </Container>
    </Modal>
  );
};

export default CalendarModal;
