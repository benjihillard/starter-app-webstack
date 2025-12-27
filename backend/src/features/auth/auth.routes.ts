import { Router } from 'express';
import { registerUser, loginUser, getMe } from './auth.controller.js';
import { authenticate } from './auth.middleware.js';
import { asyncHandler } from '../../shared/utils/index.js';

const authRouter = Router();

authRouter.post('/register', asyncHandler(registerUser));
authRouter.post('/login', asyncHandler(loginUser));
authRouter.get('/me', authenticate, asyncHandler(getMe));

export { authRouter };
