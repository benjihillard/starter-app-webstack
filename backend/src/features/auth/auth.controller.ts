import { Request, Response } from 'express';
import { register, login } from './auth.service.js';
import { AuthenticatedRequest } from './auth.middleware.js';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await register({ email, password });
  res.status(201).json(result);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await login(email, password);
  res.json(result);
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  res.json(req.user);
};
