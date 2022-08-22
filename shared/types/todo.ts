import { GeoJson } from './location';

export interface Todo {
  id: string;
  title?: string;
  location?: GeoJson;
  description?: string;
  done: boolean;
  created?: boolean;
  updated?: boolean;
  deleted?: boolean;
  alarmed: boolean;
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
  description?: string;
}
