import { Router } from 'express';
import { asyncHandler } from '@/shared/utils/index.js';
import { getUsers, getUser, createUserController } from './user.controller.js';

const userRouter = Router();

userRouter.get('/', asyncHandler(getUsers));
userRouter.get('/:id', asyncHandler(getUser));
userRouter.post('/', asyncHandler(createUserController));

export { userRouter };
