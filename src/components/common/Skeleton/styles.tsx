import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
  transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(100%);
  }
`;

export const Container = styled.li`
  display: flex;
  list-style: none;

  padding: 1.4rem;

  border: 0.1rem solid #ccc;
  border-radius: 0.4rem;
`;

export const CheckBoxContainer = styled.div``;
export const CheckBox = styled.div`
  width: 2rem;
  height: 2rem;
  background: #f2f2f2;
  border-radius: 0.3rem;
`;
export const TodoContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-left: 1.5rem;

  align-items: center;
`;

export const Title = styled.p`
  height: 2rem;
  width: 100%;
  background: #f2f2f2;
  border-radius: 0.3rem;

  /* ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2rem;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  } */
`;

export const Description = styled.p`
  background: #f2f2f2;
`;
