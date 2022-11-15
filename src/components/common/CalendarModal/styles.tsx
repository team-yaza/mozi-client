import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 31.3rem;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;

  font-size: 2rem;
  font-weight: bold;

  margin-block: 2rem;

  cursor: default;
`;

export const ArrowContainer = styled.div`
  position: relative;
  width: 2rem;

  cursor: pointer;

  stroke: ${({ theme }) => theme.color.icon};
  transition: stroke 0.3s;
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
  font-size: 1.5rem;
  text-align: center;
  color: ${({ color }) => (color ? color : '#484551')};
`;

export const DatesContainer = styled.div<{ type?: string }>`
  display: flex;
  width: 29.3rem;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  padding-block: 1rem;
  margin-inline: 1rem;

  border-bottom: ${({ type }) => (type === 'alarm' ? '0.1rem solid #eeeeee' : 'none')};
`;

export const DateDiv = styled.div<{ color?: string; selected: boolean }>`
  width: 4rem;
  height: 2rem;

  font-size: 1.3rem;
  color: ${({ color }) => (color ? color : '#000000')};

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3rem;
  background-color: ${({ selected }) => (selected ? '#EAE6FF' : '#FFFFFF')};

  cursor: default;
`;

export const Footer = styled.div`
  width: 100%;
  height: 3rem;

  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-block: 0.5rem;
`;

export const StopWatchContainer = styled.div`
  position: relative;

  width: 1.5rem;
  height: 3rem;
`;

export const TimeContainer = styled.div`
  margin-left: 1rem;
  font-size: 1.3rem;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MeridiemContainer = styled.div`
  cursor: pointer;
  margin-right: 0.2rem;
`;

export const HourInput = styled.input`
  margin-inline: 0.2rem;
  width: 1.6rem;

  border: none;
  outline: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const MinuteInput = styled.input`
  margin-inline: 0.2rem;
  width: 1.6rem;

  border: none;
  outline: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
