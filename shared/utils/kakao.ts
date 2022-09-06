import axios from 'axios';
import { KAKAO_AUTH_URL } from '@/shared/constants/kakao';

export const loginWithKakao = () => {
  window.location.href = KAKAO_AUTH_URL;
};

export const sendAccessTokenToServerAndGetJWT = async (accessToken: string) => {
  const repsonse = await axios.post(
    'http://localhost:3001/api/v1/auth/kakao',
    { accessToken },
    { withCredentials: true }
  );

  if (repsonse.status === 201 || repsonse.status === 200) {
    return repsonse.data;
  }
};

// export const displayToken = () => {
//   const token = getCookie('authorize-access-token');
//   console.log(token, '??');
//   if (token) {
//     window.Kakao.Auth.setAccessToken(token);
//     window.Kakao.Auth.getStatusInfo(({ status }: { status: string }) => {
//       if (status === 'connected') {
//         const text = 'login success. token: ' + window.Kakao.Auth.getAccessToken();
//         console.log(text);
//       } else {
//         window.Kakao.Auth.setAccessToken(null);
//       }
//     });
//   }
// };

// export const getCookie = (name: string) => {
//   console.log(document.cookie, '몽데');
//   const value = '; ' + document.cookie;
//   const parts = value.split('; ' + name + '=');
//   if (parts.length === 2) return parts.pop()?.split(';').shift();
// };
// // export const loginWithKakao = () => {
// //   window.Kakao.Auth.loginForm({
// //     success(authObj: any) {
// //       alert(JSON.stringify(authObj));
// //     },
// //     fail(err: any) {
// //       alert(JSON.stringify(err));
// //     },
// //   });
// // };
