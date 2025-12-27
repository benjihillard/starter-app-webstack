import { pool } from './database.js';

const migrations = [
  {
    name: '001_create_users_table',
    up: `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `,
  },
];

const createMigrationsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      executed_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

const getExecutedMigrations = async (): Promise<string[]> => {
  const result = await pool.query<{ name: string }>('SELECT name FROM migrations ORDER BY id');
  return result.rows.map((row) => row.name);
};

export const runMigrations = async (): Promise<void> => {
  try {
    await createMigrationsTable();
    const executedMigrations = await getExecutedMigrations();

    await migrations.reduce(async (previousPromise, migration) => {
      await previousPromise;
      if (!executedMigrations.includes(migration.name)) {
        console.log(`Running migration: ${migration.name}`);
        await pool.query(migration.up);
        await pool.query('INSERT INTO migrations (name) VALUES ($1)', [migration.name]);
        console.log(`Migration ${migration.name} completed`);
      }
    }, Promise.resolve());

    console.log('All migrations completed');
  } catch (error) {
    console.error('Migration error:', error);
    throw error;
  }
};
