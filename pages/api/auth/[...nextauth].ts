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
import { compare } from 'bcrypt';
import { sql } from '@vercel/postgres';

// Define your authentication options
const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email:{},
        password:{}
      },
      async authorize(credentials, req) {

        console.log("Credentials: ", credentials?.password)
        const response = await sql`SELECT * FROM users WHERE email=${credentials?.email};`;

        const user = response.rows[0];
        console.log("response: ",response)
        console.log("user: ",user)

        const passwordCorrect = await compare(
          credentials?.password || '', 
          user.password)

          if(passwordCorrect){
            return{
              id: user.id,
              email: user.email,
              name: user.fullname
            }
          }
        return null

      }
    })
  ],
  pages: {
    signIn: "/auth/login" // Adjust this to your desired signIn page URL
  }
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);



