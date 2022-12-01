import React, { useEffect, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import Modal from '@/components/common/Modal';
import { Button, ButtonContainer, Container, Option, Place, Select, Title } from './styles';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';

interface AlarmModalProps {
  isOpened: boolean;
  todo: Todo;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<Partial<Todo>, AxiosError, TodoUpdateRequest>;
}

const AlarmModal: React.FC<AlarmModalProps> = ({ todo, isOpened, setIsOpened, updateTodo }) => {
  const [alarmType, setAlarmType] = useState('선택안함');
  const [distanceType, setDistanceType] = useState('medium');
  const options = ['선택안함', '장소', '시간', '시간 & 장소'];

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

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const optionType = {
      장소: 'place',
      시간: 'time',
      '시간 & 장소': 'both',
    } as any;

    updateTodo({
      ...todo,
      alarmType: optionType[alarmType],
      distanceType: distanceType as 'short' | 'medium' | 'long',
    });
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
            200m
          </Button>
          <Button selected={distanceType === 'medium'} onClick={() => setDistanceType('medium')}>
            400m
          </Button>
          <Button selected={distanceType === 'long'} onClick={() => setDistanceType('long')}>
            600m
          </Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

export default React.memo(AlarmModal);
