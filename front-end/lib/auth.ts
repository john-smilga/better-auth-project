import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/lib/db';
import { nextCookies } from 'better-auth/next-js';
import * as schema from '@/lib/db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      scope: ['user:email'],
    },
  },
  advanced: {
    database: {
      generateId: 'uuid',
    },
  },
});
