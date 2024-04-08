// import { NextApiHandler } from 'next';
// import NextAuth from 'next-auth';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import GitHubProvider from 'next-auth/providers/github';
// import prisma from '@/lib/prisma';

// const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
// export default authHandler;

// const { GITHUB_ID, GITHUB_SECRET, SECRET } = process.env;

// if (!GITHUB_ID || !GITHUB_SECRET || !SECRET) {
//   throw new Error('Please provide values for GITHUB_ID, GITHUB_SECRET, and SECRET environment variables.');
// }

// const options = {
//   providers: [
//     GitHubProvider({
//       clientId: GITHUB_ID,
//       clientSecret: GITHUB_SECRET,
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
//   secret: SECRET,
// };

import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Define your authentication options
const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // Replace these conditionals with your actual authentication logic
        if ((email !== 'aprylrossecagata@gmail.com') || password !== '1234') {
          throw new Error('Invalid credentials');
        }

        return { id: '1234', name: 'Apryl C. Cuizon', email: 'aprylrossecagata@gmail.com' };
      }
    })
  ],
  pages: {
    signIn: "/auth/login" // Adjust this to your desired signIn page URL
  }
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);
