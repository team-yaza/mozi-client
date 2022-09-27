import { GeoJson } from './location';

export interface Todo {
  id: string;
  title?: string;
  description?: string;
  longitude?: number;
  latitude?: number;
  locationName?: string;
  done: boolean;
  alarmed: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  // 오프라인 로직에 사용되는 type
  created?: boolean;
  updated?: boolean;
  deleted?: boolean;

  // legacy
  location?: GeoJson;
  date?: Date;
}

export interface TodoSuccessResponse {
  id?: string;
  title?: string;
  description?: string;
  created?: boolean;
  tempTodoId?: string;
  done: boolean;
}

export interface TodoUpdateRequest {
  id: string;
  title?: string;
  done?: boolean;
  longitude?: number;
  latitude?: number;
  date?: Date;
  description?: string;
}
