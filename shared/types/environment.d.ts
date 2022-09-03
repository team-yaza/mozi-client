/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    KAKAO_ID: string;
    KAKAO_SECRET: string;
  }
}
