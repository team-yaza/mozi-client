import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import { Button, ButtonContainer, Container, Option, Place, Select, Title } from './styles';

interface AlarmModalProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlarmModal: React.FC<AlarmModalProps> = ({ isOpened, setIsOpened }) => {
  const [alarmType, setAlarmType] = useState('');
  const [distance, setDistance] = useState(1);

  alarmType;

  const options = ['선택안함', '시간', '장소', '시간 & 장소'];

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlarmType(e.target.value);
  };

  return (
    <Modal isOpened={isOpened} onClose={() => setIsOpened(false)} onConfirm={() => setIsOpened(false)}>
      <Container>
        <Title>🔔 알림 설정</Title>
        {/* <Time>🕰️ 시간 알림</Time> */}

        <Option>✅ 타입</Option>
        <Select onChange={handleChangeOption}>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </Select>

        <Place>🗺️ 장소 알림 범위</Place>

        <ButtonContainer>
          <Button selected={distance === 1} onClick={() => setDistance(1)}>
            1km
          </Button>
          <Button selected={distance === 5} onClick={() => setDistance(5)}>
            5km
          </Button>
          <Button selected={distance === 10} onClick={() => setDistance(10)}>
            10km
          </Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

export default React.memo(AlarmModal);
