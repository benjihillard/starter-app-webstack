import crypto from 'crypto';
import { pool, config } from '@/shared/config/index.js';
import { AppError } from '@/shared/middleware/index.js';
import { validateCreateUser } from './auth.validation.js';

// Types - internal to auth feature
interface User {
  id: number;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  createdAt: Date;
}

// Internal helper to transform User to UserResponse (excludes password)
const toUserResponse = (user: User): UserResponse => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt,
});

// Database operations - internal to auth feature
const findUserByEmail = async (email: string): Promise<User | null> => {
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

export const toUserResponsePublic = (user: User): UserResponse => {
  return toUserResponse(user);
};

const createUser = async (data: CreateUserDto, hashedPassword: string): Promise<UserResponse> => {
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

/**
 * Simple password hashing using crypto (for demo purposes)
 * In production, use bcrypt or argon2
 */
export const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
};

export const verifyPassword = (password: string, storedHash: string): boolean => {
  const [salt, hash] = storedHash.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
};

/**
 * Simple JWT-like token generation (for demo purposes)
 * In production, use jsonwebtoken package
 */
export const generateToken = (userId: number): string => {
  const payload = {
    userId,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto.createHmac('sha256', config.jwt.secret).update(data).digest('base64');
  return `${data}.${signature}`;
};

export const verifyToken = (token: string): { userId: number } | null => {
  try {
    const [data, signature] = token.split('.');
    const expectedSignature = crypto
      .createHmac('sha256', config.jwt.secret)
      .update(data)
      .digest('base64');

    if (signature !== expectedSignature) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(data, 'base64').toString());
    if (payload.exp < Date.now()) {
      return null;
    }

    return { userId: payload.userId };
  } catch {
    return null;
  }
};

export const register = async (
  data: CreateUserDto,
): Promise<{ user: UserResponse; token: string }> => {
  validateCreateUser(data);

  const hashedPassword = hashPassword(data.password);
  const user = await createUser(data, hashedPassword);
  const token = generateToken(user.id);

  return { user, token };
};

export const login = async (
  email: string,
  password: string,
): Promise<{ user: UserResponse; token: string }> => {
  const user = await findUserByEmail(email);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    const error: AppError = new Error('Invalid email or password');
    error.statusCode = 401;
    error.isOperational = true;
    throw error;
  }

  const token = generateToken(user.id);

  return {
    user: toUserResponse(user),
    token,
  };
};

export const getCurrentUser = async (userId: number): Promise<UserResponse> => {
  const user = await findUserById(userId);

  if (!user) {
    const error: AppError = new Error('User not found');
    error.statusCode = 404;
    error.isOperational = true;
    throw error;
  }

  return toUserResponse(user);
};
