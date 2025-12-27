import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

/**
 * Configures all middleware for the Express application
 */
export const configureMiddleware = (app: Express): void => {
  // Security headers
  app.use(helmet());

  // Request logging
  app.use(morgan('dev'));

  // Gzip compression
  app.use(compression());

  // Rate limiting (100 requests per 15 minutes per IP)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests, please try again later.' },
  });
  app.use(limiter);

  // CORS and body parsing
  app.use(cors());
  app.use(express.json());
};
