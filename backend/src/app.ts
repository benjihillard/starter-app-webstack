import express from 'express';
import { router } from '@/routes/index.js';
import { configureMiddleware, errorHandler } from '@/shared/middleware/index.js';

const app = express();

// Configure all middleware
configureMiddleware(app);

// Routes
app.use('/api', router);

// Error handling middleware (must be last)
app.use(errorHandler);

export { app };
