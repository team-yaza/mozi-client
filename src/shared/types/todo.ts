export interface Todo {
  id: string;
  title?: string;
  description?: string;
  longitude?: number;
  latitude?: number;
  locationName?: string;
  alarmDate?: string;
  dueDate?: string;

  done: boolean;
  alarmed: boolean;

  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  // 오프라인 로직에 사용되는 type
  created?: boolean;
  updated?: boolean;
  deleted?: boolean;
}

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
  done?: boolean;
  longitude?: number | null;
  latitude?: number | null;
  locationName?: string | null;
  alarmDate?: Date | null;
  dueDate?: Date | null;
  description?: string;
}
