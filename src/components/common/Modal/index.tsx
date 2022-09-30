import { createPortal } from 'react-dom';
import { Container, Dimmed } from './styles';

interface ModalProps {
  type?: 'modal' | 'alert';
  isOpened: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ type = 'modal', isOpened, onClose }) => {
  const modalRef = typeof window !== 'undefined' && document.getElementById('modal-root');
  if (!modalRef) return null;

  const renderModalActionText = () => {
    // if (confirmText) return confirmText;
    if (type === 'alert') return '삭제';
    if (type === 'modal') return '저장';
  };

  renderModalActionText;

  return createPortal(
    <Container isOpened={isOpened}>
      <Dimmed onClick={onClose} />
    </Container>,
    modalRef
  );
};

export default Modal;
