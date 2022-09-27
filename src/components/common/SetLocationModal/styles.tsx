import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 20rem;
  height: 10rem;
  background-color: #ffffff;
  box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem #bdbdbd;

  border-radius: 2rem;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  height: 100%;
  justify-content: space-between;
`;

export const Header = styled.div`
  width: 100%;
  height: 30%;
  background-color: #775eff;

  display: flex;
  justify-content: center;
`;

export const LocationNameInput = styled.input`
  width: 13rem;

  font-size: 1.4rem;

  align-self: center;

  border: none;
  :focus {
    outline: none;
  }
`;

export const ConfirmButtonnDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  margin: 1rem;
`;

export const ConfirmButton = styled.button`
  background-color: #ffffff;
  border: none;

  font-size: 1.3rem;

  margin-left: 1rem;

  color: #a09eac;

  :hover {
    color: #000000;
  }
`;
