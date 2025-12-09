import 'dotenv/config';

import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const client = postgres(connectionString, {
  ssl: 'require',
});

async function checkTables() {
  try {
    const tables = await client`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;

    console.log('Existing tables in database:');
    console.log(tables);

    await client.end();
  } catch (error) {
    console.error('Error checking tables:', error);
    await client.end();
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
}

// eslint-disable-next-line unicorn/prefer-top-level-await
checkTables();
