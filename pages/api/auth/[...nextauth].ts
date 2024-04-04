import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '@/lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const { GITHUB_ID, GITHUB_SECRET, SECRET } = process.env;

if (!GITHUB_ID || !GITHUB_SECRET || !SECRET) {
  throw new Error('Please provide values for GITHUB_ID, GITHUB_SECRET, and SECRET environment variables.');
}

const options = {
  providers: [
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: SECRET,
};
