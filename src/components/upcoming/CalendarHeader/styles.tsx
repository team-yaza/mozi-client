import styled from 'styled-components';

export const Container = styled.div``;

export const DaysContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: 0.1rem solid #eeeeee;
  padding-block: 2rem;
  margin-inline: 2rem;

  cursor: default;
`;

export const Day = styled.div<{ color?: string }>`
  width: 13%;
  font-size: 1.5rem;
  text-align: center;
  color: ${({ color }) => (color ? color : '#484551')};
`;
