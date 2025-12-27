import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

// Express error handlers require 4 params, even if next is unused
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
