import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const DatesContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  padding-inline: 2rem;
  padding-bottom: 3.4rem;
`;

export const DateContainer = styled.div<{ color?: string }>`
  width: 14.2%;
  height: 10rem;

  font-size: 1.3rem;
  color: ${({ color, theme }) => (color ? color : theme.color.white)};

  cursor: default;

  border-right: 0.1rem solid ${({ theme }) => theme.color.calendar_body_border};
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.calendar_body_border};
  margin-bottom: 1rem;

  overflow: hidden;

  transition: border 0.3s;
`;

export const DateNumber = styled.span<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 2rem;

  width: 2rem;
  height: 2rem;
  background-color: ${({ selected, theme }) => selected && theme.color.calendar_day_background};
  transition: background-color 0.3s;
`;

export const TodosContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

export const TodoTitle = styled.span<{ type: 'alarm' | 'deadline' }>`
  color: ${({ type }) => (type === 'deadline' ? '#FF6161' : '#7380F6')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
