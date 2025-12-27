import crypto from 'crypto';
import { config } from '@/shared/config/index.js';
import { findUserByEmail, createUser } from '@/features/users/user.service.js';
import { CreateUserDto, UserResponse } from '@/features/users/user.model.js';
import { validateCreateUser } from '@/features/users/user.validation.js';
import { AppError } from '@/shared/middleware/index.js';

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
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};
