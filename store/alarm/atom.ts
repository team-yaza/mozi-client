import { atom } from 'recoil';
import { Alarm } from '@/shared/types/alarm';

export const alarmListState = atom<Alarm[]>({
  key: 'alarmListState',
  default: [],
});
