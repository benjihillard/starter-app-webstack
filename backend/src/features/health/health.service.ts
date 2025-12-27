import { pool } from '../../shared/config/index.js';

export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
};
