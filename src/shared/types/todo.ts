export interface Todo {
  id: string;
  title?: string;
  index: number;
  description?: string;
  longitude?: number;
  latitude?: number;
  locationName?: string;
  alarmDate?: any;
  dueDate?: any;

  done: boolean;
  alarmed: boolean;

  deletedAt?: Date;
  createdAt: Date;
  updatedAt?: Date;

  offline?: Offline;
}

export type Offline = 'created' | 'updated' | 'deleted';

export interface TodoSuccessResponse {
  id: string;
  title?: string;
  description?: string;
  created?: boolean;
  done: boolean;
}

export interface TodoUpdateRequest {
  id: string;
  index?: number;
  title?: string;
  done?: boolean;
  longitude?: number | null;
  latitude?: number | null;
  locationName?: string | null;
  alarmDate?: Date | null;
  dueDate?: Date | null;
  description?: string;
  deletedAt?: Date | null;
  test?: any;
}

export interface TodoCreateRequest {
  title?: string;
  locationName?: string;
  longitude?: number;
  latitude?: number;
  dueDate?: Date;
}

export interface TodoStatistics {
  inbox: number;
  map: number;
  upcoming: number;
  logbook: number;
  trash: number;
}
