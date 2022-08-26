import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  left: 0;

  width: 30rem;
  height: 100vh;
  background-color: white;
  z-index: 1;
`;

export const Input = styled.input``;

export const SideBarToggleButton = styled.button`
  position: absolute;
  right: -2rem;
  width: 2.2rem;
  height: 5rem;

  top: 50%;
  transform: translateY(-50%);

  font-size: 0;

  outline: none;
  border: none;
  border-top-right-radius: 0.7rem;
  border-bottom-right-radius: 0.7rem;

  background-color: red;
`;
