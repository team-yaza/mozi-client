import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 30rem;
  height: 22rem;
  background-color: #ffffff;
  box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem #bdbdbd;
  border-radius: 2rem;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;

  font-size: 1.5rem;
  font-weight: bold;

  margin-block: 2rem;

  cursor: default;
`;

export const ArrowContainer = styled.div`
  position: relative;
  width: 2rem;

  cursor: pointer;
`;

export const DaysContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: 0.1rem solid #eeeeee;
  padding-bottom: 1rem;
  margin-inline: 1rem;

  cursor: default;
`;

export const Day = styled.div<{ color?: string }>`
  width: 4rem;
  font-size: 1.3rem;
  text-align: center;
  color: ${({ color }) => (color ? color : '#484551')};
`;

export const DatesContainer = styled.div`
  display: flex;
  width: 30rem;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1rem;
`;

export const DateDiv = styled.div<{ color?: string; selected: boolean }>`
  width: 4rem;
  height: 2rem;

  font-size: 1rem;
  color: ${({ color }) => (color ? color : '#000000')};

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3rem;
  background-color: ${({ selected }) => (selected ? '#EAE6FF' : '#FFFFFF')};

  cursor: default;
`;
