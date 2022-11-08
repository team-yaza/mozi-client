import { theme } from '@/styles/theme';
import React from 'react';
import { Day, DaysContainer } from './styles';

const CalendarHeader: React.FC = () => {
  return (
    <DaysContainer>
      <Day color={theme.colors.red}>Sun</Day>
      <Day>Mon</Day>
      <Day>Tue</Day>
      <Day>Wed</Day>
      <Day>Thu</Day>
      <Day>Fri</Day>
      <Day color={theme.colors.purple1}>Sat</Day>
    </DaysContainer>
  );
};

export default React.memo(CalendarHeader);
