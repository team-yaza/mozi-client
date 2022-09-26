import { GeoJson } from '@/shared/types/location';

export const serializeGeoJson = (longitude: number, latitude: number, name: string): GeoJson => ({
  type: 'Point',
  name,
  coordinates: [longitude, latitude],
});

export const serializeAlarmList = (alarmList: any) => {
  return alarmList.map((alarm: any) => ({
    todoId: alarm.todoId.id,
    location: serializeGeoJson(
      alarm.todoId.location.coordinates[1],
      alarm.todoId.location.coordinates[0],
      alarm.todoId.location.name
    ),
    visited: false,
  }));
};
