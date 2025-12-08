import { defineConfig } from 'drizzle-kit';

const connectionString = process.env.DATABASE_URL!;

// Add SSL parameter to connection string if not present
const dbUrl = connectionString.includes('?') ? `${connectionString}&sslmode=require` : `${connectionString}?sslmode=require`;

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
});
