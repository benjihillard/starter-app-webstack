# Starter App Webstack

A barebones full-stack starter with PostgreSQL, Express.js, React, and Docker.

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
│   │   ├── index.ts          # Express app entry
│   │   ├── db/               # Database connection
│   │   └── routes/           # API routes
│   ├── Dockerfile            # Production build
│   ├── Dockerfile.dev        # Development build
│   └── vitest.config.ts      # Test config
├── frontend/
│   ├── src/
│   │   ├── main.tsx          # React entry
│   │   └── App.tsx           # Main component
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

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check (returns DB status) |

## License

MIT

