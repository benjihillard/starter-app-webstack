import { pool } from '@/shared/config/index.js';
import { AppError } from '@/shared/middleware/index.js';
import { User, CreateUserDto, UserResponse, toUserResponse } from './user.model.js';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query<User>(
    'SELECT id, email, password_hash as "passwordHash", created_at as "createdAt", updated_at as "updatedAt" FROM users WHERE email = $1',
    [email],
  );
  return result.rows[0] || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query<User>(
    'SELECT id, email, password_hash as "passwordHash", created_at as "createdAt", updated_at as "updatedAt" FROM users WHERE id = $1',
    [id],
  );
  return result.rows[0] || null;
};

export const createUser = async (
  data: CreateUserDto,
  hashedPassword: string,
): Promise<UserResponse> => {
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    const error: AppError = new Error('Email already registered');
    error.statusCode = 409;
    error.isOperational = true;
    throw error;
  }

  const result = await pool.query<User>(
    `INSERT INTO users (email, password_hash, created_at, updated_at)
     VALUES ($1, $2, NOW(), NOW())
     RETURNING id, email, password_hash as "passwordHash", created_at as "createdAt", updated_at as "updatedAt"`,
    [data.email, hashedPassword],
  );

  return toUserResponse(result.rows[0]);
};

export const getAllUsers = async (): Promise<UserResponse[]> => {
  const result = await pool.query<User>(
    'SELECT id, email, password_hash as "passwordHash", created_at as "createdAt", updated_at as "updatedAt" FROM users ORDER BY created_at DESC',
  );
  return result.rows.map(toUserResponse);
};

export const getUserById = async (id: number): Promise<UserResponse> => {
  const user = await findUserById(id);
  if (!user) {
    const error: AppError = new Error('User not found');
    error.statusCode = 404;
    error.isOperational = true;
    throw error;
  }
  return toUserResponse(user);
};
