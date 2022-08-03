export interface Todo {
  _id: string;
  title: string;
  description?: string;
}

export interface TodoSuccessResponse {
  _id: string;
  title: string;
  description?: string;
}
