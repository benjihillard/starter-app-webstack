import { Router } from 'express';
import { healthRouter, authRouter } from '@/features/index.js';

const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);

export { router };
