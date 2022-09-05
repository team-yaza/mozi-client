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
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 15 * 24 * 30 * 30, // 15 days
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.id = user.id;
      return token;
    },
    session: async ({ session, token }) => {
      if (token) session.id = token.id;
      return session;
    },
    signIn: async ({ user, profile }) => {
      console.log(user, '유저');
      console.log(profile, 'profile');

      try {
        await axios.post('http://localhost:3001/api/v1/auth/register', user);
      } catch (error) {
        console.log('실패');
      }

      return '/';
    },
  },
});
