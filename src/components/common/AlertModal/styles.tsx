import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 20rem;
  height: 12rem;
  background-color: #ffffff;
  box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem #bdbdbd;

  border-radius: 2rem;
  overflow: hidden;

  top: 40%;
  left: 50%;
  transform: translate(-50%, -70%);

  z-index: 105;
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

export const Content = styled.div`
  width: 20rem;

  font-size: 1.4rem;

  align-self: center;
  text-align: center;
`;

export const ButtonnDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  margin: 1rem;
  padding-right: 1rem;
`;

const ButtonStyle = css`
  background-color: #ffffff;
  border: none;

  font-size: 1.3rem;

  margin-left: 1rem;
`;

export const CancelButton = styled.button`
  ${ButtonStyle}

  color: #a09eac;
  :hover {
    color: #000000;
  }
`;

export const ConfirmButton = styled.button`
  ${ButtonStyle}
  color: red;
`;
