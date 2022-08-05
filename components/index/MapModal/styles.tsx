import styled from 'styled-components';

export const Container = styled.div`
  width: 20rem;
  height: 20rem;

  position: absolute !important;

  z-index: 10;

  background-color: gray;
`;

export const Map = styled.div`
  width: 100%;
  height: 100%;
`;

export const ModalWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
`;

export const SizeBtn = styled.button`
  position: absolute;

  width: 1.5rem;
  height: 1.5rem;

  z-index: 100;
`;

export const ConfirmBtn = styled.button`
  position: absolute;

  width: 1.5rem;
  height: 1.5rem;

  bottom: 0rem;
  right: 0rem;
  z-index: 100;
`;
