import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const DatesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  padding: 2rem;
`;

export const DateContainer = styled.div<{ color?: string }>`
  width: 14.2%;
  height: 10rem;

  font-size: 1.3rem;
  color: ${({ color }) => (color ? color : '#000000')};

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
  background-color: ${({ selected }) => (selected ? '#ECECEC' : '#FFFFFF')};
`;

export const TodosContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

export const TodoTitle = styled.span`
  color: #735aff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
