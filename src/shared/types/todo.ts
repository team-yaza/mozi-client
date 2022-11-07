export interface Todo {
  id: string;
  title?: string;
  description?: string;
  index: number;
  done: boolean;
  longitude?: number;
  latitude?: number;
  locationName?: string;
  alarmDate?: any;
  dueDate?: any;

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
  title?: string;
  description?: string;
  index?: number;
  done?: boolean;
  longitude?: number | null;
  latitude?: number | null;
  locationName?: string | null;
  alarmDate?: Date | null;
  dueDate?: Date | null;
  deletedAt?: Date | null;
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
