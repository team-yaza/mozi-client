import { getDistance } from '@/shared/utils/location';
import { Todo } from '../shared/types/todo';

type condition = 'time' | 'place';

interface UserState {
  date: Date;
  longitude: number;
  latitude: number;
}

const alarmConditionChecker = {
  time(todo: Todo, state: UserState): boolean {
    if (!todo.alarmDate) return false;

    const { date } = state;
    const diff = (todo.alarmDate.getTime() - date.getTime()) / 1000 / 60;

    return 0 <= diff && diff <= 1;
  },

  place(todo: Todo, state: UserState): boolean {
    if (!todo.longitude || !todo.latitude || !todo.distanceType) return false;

    const { longitude, latitude } = state;
    const distance = getDistance(todo.latitude, todo.longitude, latitude, longitude);

    const standard = {
      short: 1,
      medium: 5,
      long: 10,
    }[todo.distanceType];

    return distance <= standard;
  },
};

export const allAlarmConditionsSatisfied = (todo: Todo, state: UserState): boolean => {
  if (todo.alarmed || todo.deletedAt || !todo.alarmType) return false;

  const conditions: condition[] = todo.alarmType === 'both' ? ['time', 'place'] : [todo.alarmType];

  return conditions.every((condition) => alarmConditionChecker[condition](todo, state));
};
