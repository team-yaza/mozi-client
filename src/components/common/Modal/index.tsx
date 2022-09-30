import React from 'react';
import { createPortal } from 'react-dom';
import {
  CancelButton,
  ConfirmButton,
  Container,
  Dimmed,
  ModalActionContainer,
  ModalContent,
  ModalInner,
} from './styles';

interface ModalProps {
  type?: 'modal' | 'alert';
  isOpened: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ type = 'modal', isOpened, onClose, onConfirm, children }) => {
  const modalRef = typeof window !== 'undefined' && document.getElementById('modal-root');
  if (!modalRef) return null;

  const renderModalConfirmText = () => {
    // if (confirmText) return confirmText;
    if (type === 'modal') return '확인';
    if (type === 'alert') return '삭제';
  };

  // renderModalActionText;

  return createPortal(
    <Container isOpened={isOpened}>
      {/* 모달 바깥 검정 배경 */}
      <Dimmed onClick={onClose} />
      {/* 모달 내부 */}
      <ModalInner>
        <ModalContent>{children}</ModalContent>
        <ModalActionContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>{renderModalConfirmText()}</ConfirmButton>
        </ModalActionContainer>
      </ModalInner>
    </Container>,
    modalRef
  );
};

export default React.memo(Modal);
