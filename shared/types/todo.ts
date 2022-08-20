import { GeoJson } from './location';

export interface Todo {
  id: string;
  title?: string;
  location?: GeoJson;
  description?: string;
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
}

export interface TodoUpdateRequest {
  id: string;
  title?: string;
  longitude?: number;
  latitude?: number;
  description?: string;
}
