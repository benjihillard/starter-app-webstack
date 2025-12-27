import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './auth.service.js';
import { findUserById } from '../users/user.service.js';
import { UserResponse, toUserResponse } from '../users/user.model.js';
import { AppError } from '../../shared/middleware/index.js';

export interface AuthenticatedRequest extends Request {
  user?: UserResponse;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error: AppError = new Error('No token provided');
      error.statusCode = 401;
      error.isOperational = true;
      throw error;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      const error: AppError = new Error('Invalid or expired token');
      error.statusCode = 401;
      error.isOperational = true;
      throw error;
    }

    const user = await findUserById(decoded.userId);

    if (!user) {
      const error: AppError = new Error('User not found');
      error.statusCode = 401;
      error.isOperational = true;
      throw error;
    }

    req.user = toUserResponse(user);
    next();
  } catch (error) {
    next(error);
  }
};
