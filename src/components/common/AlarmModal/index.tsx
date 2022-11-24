import React, { useEffect, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import Modal from '@/components/common/Modal';
import { Button, ButtonContainer, Container, Option, Place, Select, Title } from './styles';
import { Todo } from '@/shared/types/todo';

interface AlarmModalProps {
  isOpened: boolean;
  todo: Todo;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<unknown, unknown, unknown, unknown>;
}

const AlarmModal: React.FC<AlarmModalProps> = ({ todo, isOpened, setIsOpened, updateTodo }) => {
  const [alarmType, setAlarmType] = useState('선택안함');
  const [distanceType, setDistanceType] = useState('medium');

  const options = ['선택안함', 'place', 'time', 'both'];

  useEffect(() => {
    if (todo.alarmType) {
      setAlarmType(todo.alarmType);
    }

    if (todo.distanceType) {
      setDistanceType(todo.distanceType);
    }
  }, [todo]);

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlarmType(e.target.value);
  };

  const updateAlarm = () => {
    if (alarmType === '선택안함') {
      return;
    }

    updateTodo({ ...todo, alarmType, distanceType });
    setIsOpened(false);
  };

  return (
    <Modal isOpened={isOpened} onClose={() => setIsOpened(false)} onConfirm={updateAlarm}>
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
          <Button selected={distanceType === 'short'} onClick={() => setDistanceType('short')}>
            1km
          </Button>
          <Button selected={distanceType === 'medium'} onClick={() => setDistanceType('medium')}>
            5km
          </Button>
          <Button selected={distanceType === 'long'} onClick={() => setDistanceType('long')}>
            10km
          </Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

export default React.memo(AlarmModal);
