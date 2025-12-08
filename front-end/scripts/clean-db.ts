import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const client = postgres(connectionString, {
  ssl: 'require',
});

async function cleanDatabase() {
  try {
    console.log('Dropping existing tables...');

    // Drop tables in correct order (respecting foreign key constraints)
    await client`DROP TABLE IF EXISTS "account" CASCADE`;
    await client`DROP TABLE IF EXISTS "session" CASCADE`;
    await client`DROP TABLE IF EXISTS "verification" CASCADE`;
    await client`DROP TABLE IF EXISTS "user" CASCADE`;

    console.log('Database cleaned successfully!');

    await client.end();
  } catch (error) {
    console.error('Error cleaning database:', error);
    await client.end();
    process.exit(1);
  }
}

cleanDatabase();
