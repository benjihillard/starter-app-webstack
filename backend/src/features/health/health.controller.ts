import { Request, Response } from 'express';
import { checkDatabaseHealth } from './health.service.js';

export const getHealth = async (_req: Request, res: Response) => {
  try {
    const dbStatus = await checkDatabaseHealth();
    res.json({
      status: 'ok',
      database: dbStatus ? 'connected' : 'disconnected',
    });
  } catch {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
    });
  }
};
