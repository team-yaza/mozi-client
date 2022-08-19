import { GeoJson } from './location';

export interface Alarm {
  todoId: string;
  location: GeoJson;
  visited?: boolean;
}

export interface UpdateAlarmProps {
  todoId: string;
  longitude: number;
  latitude: number;
  name: string;
  visited: boolean;
}
