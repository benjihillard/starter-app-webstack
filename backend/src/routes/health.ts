import { Router, Request, Response } from 'express';
import { pool } from '../db/index.js';

const healthRouter = Router();

healthRouter.get('/', async (_req: Request, res: Response) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

export { healthRouter };
