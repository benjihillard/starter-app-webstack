import { Router } from 'express';
import { getUsers, getUser, createUserController } from './user.controller.js';
import { asyncHandler } from '../../shared/utils/index.js';

const userRouter = Router();

userRouter.get('/', asyncHandler(getUsers));
userRouter.get('/:id', asyncHandler(getUser));
userRouter.post('/', asyncHandler(createUserController));

export { userRouter };
