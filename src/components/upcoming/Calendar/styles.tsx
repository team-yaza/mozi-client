import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;

  margin-top: 1rem;

  min-width: 33rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;

  font-size: 2rem;
  font-weight: bold;

  margin-block: 4rem;

  cursor: default;
`;

export const ArrowContainer = styled.div`
  position: relative;
  width: 2rem;

  margin-inline: 2rem;

  cursor: pointer;
`;

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

export const DatesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  padding: 2rem;
`;

export const DateDiv = styled.div<{ color?: string; selected: boolean }>`
  width: 13%;
  aspect-ratio: 1/0.9;

  font-size: 1.3rem;
  color: ${({ color }) => (color ? color : '#000000')};

  cursor: default;

  border-right: 0.1rem solid #e8e8e8;
  border-bottom: 0.1rem solid #e8e8e8;
  margin-bottom: 1rem;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 2rem;

    width: 2rem;
    height: 2rem;
    background-color: ${({ selected }) => (selected ? '#ECECEC' : '#FFFFFF')};
  }
`;
