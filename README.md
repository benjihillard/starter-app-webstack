# Starter App Webstack

A full-stack starter with PostgreSQL, Express.js, React (with Redux, React Router, and React Query), Storybook, and Docker. Includes authentication, user management, and database migrations. Built with TypeScript, ESLint, and Vitest for robust development.

## Tech Stack

- **Database:** PostgreSQL 16
- **Backend:** Express.js + TypeScript
- **Frontend:** React + Vite + TypeScript
- **Testing:** Vitest
- **Linting:** ESLint (Airbnb) + Prettier
- **Containerization:** Docker + Docker Compose

## Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm

## Quick Start

### Development (with Docker)

Spin up PostgreSQL, backend, and frontend with hot reloading:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Database: localhost:5432

### Development (without Docker)

```bash
# Install dependencies
npm run install:all

# Start backend (requires local PostgreSQL)
npm run dev:backend

# Start frontend (in another terminal)
npm run dev:frontend
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install dependencies for backend & frontend |
| `npm run dev` | Start all services with Docker (hot reload) |
| `npm run dev:backend` | Start backend only |
| `npm run dev:frontend` | Start frontend only |
| `npm run build` | Build both apps |
| `npm test` | Run all tests |
| `npm run test:backend` | Run backend tests |
| `npm run test:frontend` | Run frontend tests |
| `npm run lint` | Lint all code |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format code with Prettier |

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── app.ts            # Express app setup
│   │   ├── server.ts         # Server entry point
│   │   ├── routes/           # API route definitions
│   │   ├── features/         # Feature modules
│   │   │   ├── auth/         # Authentication (login, register, user management)
│   │   │   └── health/       # Health check endpoint
│   │   └── shared/           # Shared utilities
│   │       ├── config/       # Configuration & migrations
│   │       ├── middleware/   # Express middleware
│   │       └── utils/        # Utility functions
│   ├── Dockerfile            # Production build
│   ├── Dockerfile.dev        # Development build
│   └── vitest.config.ts      # Test config
├── frontend/
│   ├── src/
│   │   ├── main.tsx          # React entry
│   │   ├── app/              # App shell & routing
│   │   ├── features/         # Feature modules
│   │   │   ├── auth/         # Authentication UI
│   │   │   ├── counter/      # Counter example
│   │   │   └── health/       # Health check UI
│   │   ├── pages/             # Page components
│   │   ├── components/        # Shared components
│   │   └── styles/           # Global styles
│   ├── Dockerfile            # Production build (nginx)
│   ├── Dockerfile.dev        # Development build
│   └── vitest.config.ts      # Test config
├── docker-compose.yml        # Production compose
├── docker-compose.dev.yml    # Development compose
└── .prettierrc               # Prettier config
```

## Environment Variables

### Backend

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `DB_HOST` | localhost | Database host |
| `DB_PORT` | 5432 | Database port |
| `DB_NAME` | app_db | Database name |
| `DB_USER` | postgres | Database user |
| `DB_PASSWORD` | postgres | Database password |
| `JWT_SECRET` | your-secret-key-change-in-production | JWT signing secret |
| `JWT_EXPIRES_IN` | 7d | JWT token expiration |
| `NODE_ENV` | development | Environment mode |

## Docker Commands

```bash
# Development (hot reload)
docker compose -f docker-compose.dev.yml up --build

# Production
docker compose up --build

# Stop all containers
docker compose down

# Run specific service
docker compose -f docker-compose.dev.yml up db        # Database only
docker compose -f docker-compose.dev.yml up backend   # Backend + DB
```

## Testing

```bash
# Run all tests
npm test

# Watch mode
cd backend && npm run test:watch
cd frontend && npm run test:watch

# With coverage
cd backend && npx vitest run --coverage
cd frontend && npx vitest run --coverage
```

## API Endpoints

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check (returns DB status) |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user (creates account and returns token) |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/auth/me` | Get current authenticated user (requires Bearer token) |

## Features

### Backend

- **Database Migrations**: Automatic schema migrations on server startup
- **Authentication**: JWT-based authentication with password hashing and user management (self-contained feature)
- **Path Aliases**: Use `@/` prefix for cleaner imports (e.g., `@/shared/utils`)
- **Middleware**: Centralized middleware configuration
- **Error Handling**: Consistent error handling across all endpoints

### Frontend

- **Authentication UI**: Login and signup forms with token management
- **React Query**: Data fetching and caching
- **Path Aliases**: Use `@/` prefix for imports (e.g., `@/features/auth`)
- **Routing**: React Router with protected routes support
- **State Management**: Redux Toolkit for global state

## Database

The database schema is automatically created on server startup via migrations. The initial migration creates:

- `users` table with email, password hash, and timestamps
- `migrations` table to track executed migrations

Migrations are stored in `backend/src/shared/config/migrations.ts` and run automatically when the server starts.

## Starting Fresh

To remove all example features and start building your own:

### Backend Cleanup

1. **Remove feature directories:**
   ```bash
   rm -rf backend/src/features/auth
   rm -rf backend/src/features/health
   ```

2. **Update routes** (`backend/src/routes/index.ts`):
   ```typescript
   import { Router } from 'express';
   
   const router = Router();
   
   // Add your routes here
   
   export { router };
   ```

3. **Clear migrations** (`backend/src/shared/config/migrations.ts`):
   ```typescript
   const migrations: Array<{ name: string; up: string }> = [];
   
   // Add your migrations here
   ```

4. **Reset database** (if you want to start with a clean database):
   ```bash
   # Stop containers
   docker compose down
   
   # Remove volume (WARNING: deletes all data)
   docker volume rm starter-app-webstack_postgres_data
   
   # Or connect to database and drop tables manually
   docker compose -f docker-compose.dev.yml exec db psql -U postgres -d app_db
   # Then: DROP TABLE IF EXISTS users, migrations CASCADE;
   ```

### Frontend Cleanup

1. **Remove feature directories:**
   ```bash
   rm -rf frontend/src/features/auth
   rm -rf frontend/src/features/counter
   rm -rf frontend/src/features/health
   ```

2. **Remove example pages:**
   ```bash
   rm -rf frontend/src/pages/CounterPage
   rm -rf frontend/src/pages/HealthPage
   rm -rf frontend/src/pages/AuthPage
   ```

3. **Update router** (`frontend/src/app/router.tsx`):
   ```typescript
   import { createBrowserRouter } from 'react-router-dom';
   import App from '@/app/App';
   import About from '@/pages/About';
   
   export const router = createBrowserRouter([
     {
       path: '/',
       element: <App />,
       children: [
         { index: true, element: <About /> },
         // Add your routes here
       ],
     },
   ]);
   ```

4. **Update navbar** (`frontend/src/components/Navbar/Navbar.tsx`):
   ```typescript
   // Remove links to Counter, Health, and Auth pages
   // Keep only Home or add your own navigation
   ```

5. **Update features index** (`frontend/src/features/index.ts`):
   ```typescript
   // Remove exports for deleted features
   // Add your own feature exports
   ```

### What to Keep

Keep these foundational pieces:

- **Backend:**
  - `backend/src/shared/` - Shared utilities, middleware, config
  - `backend/src/app.ts` - Express app setup
  - `backend/src/server.ts` - Server entry point
  - `backend/src/routes/index.ts` - Route definitions (just clear the routes)

- **Frontend:**
  - `frontend/src/app/` - App shell and routing setup
  - `frontend/src/components/` - Shared components (Navbar, Footer)
  - `frontend/src/styles/` - Global styles
  - `frontend/src/test/` - Test utilities

- **Infrastructure:**
  - Docker configuration
  - Database setup
  - Build configurations
  - Linting/formatting setup

### Quick Clean Script

Create a cleanup script (`scripts/clean-features.sh`):

```bash
#!/bin/bash

# Backend
rm -rf backend/src/features/auth
rm -rf backend/src/features/health

# Frontend
rm -rf frontend/src/features/auth
rm -rf frontend/src/features/counter
rm -rf frontend/src/features/health
rm -rf frontend/src/pages/CounterPage
rm -rf frontend/src/pages/HealthPage
rm -rf frontend/src/pages/AuthPage

echo "Features removed! Don't forget to update routes and clean up imports."
```

## License

MIT

