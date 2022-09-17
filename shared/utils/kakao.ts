import axios from 'axios';
import { KAKAO_AUTH_URL } from '@/shared/constants/kakao';

export const loginWithKakao = () => {
  window.location.href = KAKAO_AUTH_URL;
};

export const sendAccessTokenToServerAndGetJWT = async (accessToken: string) => {
  const repsonse = await axios.post(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001/api/v1/auth/kakao'
      : 'https://mozi-server.com/api/v1/auth/kakao',
    { accessToken },
    { withCredentials: true }
  );

  if (repsonse.status === 201 || repsonse.status === 200) {
    return repsonse.data;
  }
};
