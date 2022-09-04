import NextAuth from 'next-auth/next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import KakaoProvider from 'next-auth/providers/kakao';

import prisma from '@/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
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

      const existedUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (existedUser) {
        return '/';
      }

      const createdUser = await prisma.user.create({
        data: {
          name: user.name,
          id: user.id,
          email: user.email,
        },
      });

      console.log(createdUser, 'createdUser');

      return true;
    },
    // session: async (session, user) => {
    //   session.id = user.id;
    //   return Promise.resolve(session);
    // },
  },
});

//   try {
//     const exitedUser = await prisma.user.findUnique({
//       where: { email: user.email as string },
//     });

//     if (exitedUser) {
//       return Promise.resolve(true);
//     } else {
//       const createdUser = await prisma.user.create({
//         data: {
//           name: user.name as string,
//           email: user.email as string,
//         },
//       });
//       console.log(createdUser);
//       return Promise.resolve(true);
//     }
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(true);
//   }
// },
// async signIn({ user, account, profile, email, credentials }) {
//   // console.log(user, account, profile, email, credentials, 'zz');
//   console.log(user, 1);
//   console.log(account, 2);
//   console.log(profile, 3);
//   console.log(email, 4);
//   console.log(credentials, 5);
//   return true;
// },
// async session({ session, token }) {
//   session.accessToken = token.accessToken;
//   console.log(session);
//   return session;
