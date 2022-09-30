import { useLayoutEffect, useRef, useState } from 'react';

import Modal from '@/components/common/Modal';
import { ContentContainer, LocationInput, Title } from './styles';

interface SetLocationModalProps {
  isOpened: boolean;
  onClose: () => void;
  updateLocationName: (locationName: string) => void;
}

const SetLocationModal: React.FC<SetLocationModalProps> = ({ isOpened, onClose, updateLocationName }) => {
  const [locationName, setLocationName] = useState('');
  const locationNameInputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpened) {
      timer = setTimeout(() => {
        locationNameInputRef.current?.focus();
      }, 300);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOpened]);

  const onConfirm = () => {
    updateLocationName(locationName);
    onClose();
  };

  return (
    <Modal isOpened={isOpened} onClose={onClose} onConfirm={onConfirm}>
      <ContentContainer>
        <Title htmlFor="locationName">🚩 장소의 이름을 입력해주세요.</Title>
        <LocationInput
          id="locationName"
          ref={locationNameInputRef}
          spellCheck={false}
          placeholder="스타벅스"
          onChange={(e) => setLocationName(e.target.value)}
        />
      </ContentContainer>
    </Modal>
  );
};

export default SetLocationModal;
