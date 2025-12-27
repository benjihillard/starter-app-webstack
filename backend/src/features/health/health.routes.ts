import { Router } from 'express';
import { getHealth } from './health.controller.js';
import { asyncHandler } from '../../shared/utils/index.js';

const healthRouter = Router();

healthRouter.get('/', asyncHandler(getHealth));

export { healthRouter };
