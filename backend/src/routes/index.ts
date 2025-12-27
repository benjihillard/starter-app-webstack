import { Router } from 'express';
import { healthRouter, userRouter, authRouter } from '@/features/index.js';

const router = Router();

router.use('/health', healthRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

export { router };
