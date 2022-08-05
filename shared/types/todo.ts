export interface Todo {
  id: string;
  title: string;
  description?: string;
}

export interface TodoSuccessResponse {
  id: string;
  title: string;
  description?: string;
}

export interface UpdateTodoProps {
  id: string;
  title?: string;
  longitude?: number;
  latitude?: number;
  description?: string;
}
