// ! TODO 우선 서버에서 어떻게 응답을 줄지 명확하게 합의되지 않은 상태이므로 모두 Optional로 처리
export interface ServerResponse {
  code?: number;
  data?: null;
  msg?: string;
  success?: boolean;
}
