import { Router } from 'express';
import { asyncHandler } from '@/shared/utils/index.js';
import { getHealth } from './health.controller.js';

const healthRouter = Router();

healthRouter.get('/', asyncHandler(getHealth));

export { healthRouter };
