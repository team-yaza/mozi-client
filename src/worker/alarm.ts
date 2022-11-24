import { getDistance } from '../shared/utils/location';
import { Todo } from '../shared/types/todo';
import { Location } from '../shared/types/location';

type condition = 'time' | 'place';

const standard = {
  short: 1,
  medium: 5,
  long: 10,
};

const alarmConditionChecker = {
  time(todo: Todo): boolean {
    if (!todo.alarmDate) return false;

    const diff = (todo.alarmDate.getTime() - new Date().getTime()) / 1000;

    return 0 <= diff && diff <= 60;
  },

  place(todo: Todo, location: Location): boolean {
    if (!todo.longitude || !todo.latitude || !todo.distanceType) return false;

    const { longitude, latitude } = location;
    const distance = getDistance(todo.latitude, todo.longitude, latitude, longitude);

    return distance <= standard[todo.distanceType];
  },
};

export const allAlarmConditionsSatisfied = (todo: Todo, location: Location): boolean => {
  if (todo.alarmed || todo.deletedAt || !todo.alarmType) return false;

  const conditions: condition[] = todo.alarmType === 'both' ? ['time', 'place'] : [todo.alarmType];

  return conditions.every((condition) => alarmConditionChecker[condition](todo, location));
};
