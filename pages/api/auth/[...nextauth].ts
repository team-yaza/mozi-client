import NextAuth from 'next-auth/next';
import KakaoProvider from 'next-auth/providers/kakao';
import axios from 'axios';

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // reference: https://next-auth.js.org/configuration/callbacks
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.provicer = token.provider;

      return session;
    },
    jwt: async ({ token, user }) => {
      // console.log(token, user, account, '토큰유저계정');

      if (user) token.id = user.id;
      return token;
    },
    signIn: async ({ user, profile }) => {
      console.log(profile, 'profile');
      // profile;
      try {
        await axios.post('http://localhost:3001/api/v1/auth/register', user);
      } catch (error) {
        console.log('실패');
      }
      return true;
    },
    redirect: async ({ baseUrl }) => {
      return baseUrl;
    },
  },
});
