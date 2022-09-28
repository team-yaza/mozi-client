import { Container } from './styles';

interface ModalBackgroundProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBackground: React.FC<ModalBackgroundProps> = ({ setIsModalOpen }) => {
  const onClickHandler = () => {
    setIsModalOpen(false);
  };

  return <Container onClick={onClickHandler}></Container>;
};

export default ModalBackground;
