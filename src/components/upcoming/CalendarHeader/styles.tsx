import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 2rem;
`;

export const DaysContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: ${({ theme }) => `0.1rem solid ${theme.color.calendar_border}`};

  padding-block: 2rem;
  margin-inline: 2rem;

  cursor: default;
  transition: border-bottom 0.3s;
`;

export const Day = styled.div<{ color?: string }>`
  width: 13%;
  font-size: 1.5rem;
  text-align: center;
  color: ${({ color, theme }) => (color ? color : theme.color.calendar_header)};
  transition: color 0.3s;
`;
