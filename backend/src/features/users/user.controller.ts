import { Request, Response } from 'express';
import { getAllUsers, getUserById, createUser } from './user.service.js';
import { validateCreateUser } from './user.validation.js';
import { hashPassword } from '../auth/auth.service.js';
import { CreateUserDto } from './user.model.js';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const user = await getUserById(id);
  res.json(user);
};

export const createUserController = async (req: Request, res: Response) => {
  const userData: CreateUserDto = req.body;

  // Validate input
  validateCreateUser(userData);

  // Hash password
  const hashedPassword = hashPassword(userData.password);

  // Create user
  const user = await createUser(userData, hashedPassword);

  res.status(201).json(user);
};
