import { AppError } from '@/shared/middleware/index.js';

// Validation - internal to auth feature
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateCreateUser = (data: { email?: string; password?: string }): void => {
  if (!data.email || !validateEmail(data.email)) {
    const error: AppError = new Error('Invalid email format');
    error.statusCode = 400;
    error.isOperational = true;
    throw error;
  }

  if (!data.password || !validatePassword(data.password)) {
    const error: AppError = new Error('Password must be at least 8 characters');
    error.statusCode = 400;
    error.isOperational = true;
    throw error;
  }
};
