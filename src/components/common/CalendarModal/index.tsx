import React, { useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getYearAndMonth, getCalendarDates, getDateToHour, getDateToMin } from '@/shared/utils/date';
import { NEXTARROW, PREVARROW, STOPWATCH } from '@/components/common/Figure';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';
import Modal from '@/components/common/Modal';
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
  todo: Todo;
  date: Date;
  type: 'alarm' | 'due';
  isCalendarModalOpen: boolean;
  setIsCalendarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<Partial<Todo>, AxiosError, TodoUpdateRequest>;
}

const HOURS = 12;
const DAYS = 7;
const SUN = 0;
const SAT = 6;

const CalendarModal: React.FC<CalendarModalProps> = ({
  todo,
  type,
  date,
  isCalendarModalOpen,
  setIsCalendarModalOpen,
  updateTodo,
}) => {
  const [nowDate, setNowDate] = useState(date);

  const onMeridiemToggle = () => {
    const nowHour = nowDate.getHours();
    const newHour = nowHour >= HOURS ? nowHour - HOURS : nowHour + HOURS;
    setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), newHour, nowDate.getMinutes()));
  };

  const onDateClickHandler = (year: number, month: number, dateTime: number) => {
    setNowDate(new Date(year, month, dateTime, nowDate.getHours(), nowDate.getMinutes()));
  };

  const onConfirmHandler = () => {
    setIsCalendarModalOpen(false);
    if (type === 'alarm') updateTodo({ ...todo, alarmDate: nowDate });
    else updateTodo({ ...todo, dueDate: nowDate });
  };

  const onPrevArrowClickHandler = () => {
    setNowDate(
      new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() - 1,
        nowDate.getDate(),
        nowDate.getHours(),
        nowDate.getMinutes()
      )
    );
  };

  const onNextArrowClickHandler = () => {
    setNowDate(
      new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() + 1,
        nowDate.getDate(),
        nowDate.getHours(),
        nowDate.getMinutes()
      )
    );
  };

  const onHourInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == '') return;
    const hour = nowDate.getHours() < HOURS ? Number(e.target.value) : Number(e.target.value) + 12;
    setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), hour, nowDate.getMinutes()));
  };

  const onMinuteInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == '') return;
    setNowDate(
      new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours(), Number(e.target.value))
    );
  };

  return (
    <Modal isOpened={isCalendarModalOpen} onClose={() => setIsCalendarModalOpen(false)} onConfirm={onConfirmHandler}>
      <Container>
        <Header>
          <ArrowContainer onClick={onPrevArrowClickHandler}>
            <PREVARROW />
          </ArrowContainer>
          {getYearAndMonth(nowDate)}
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
