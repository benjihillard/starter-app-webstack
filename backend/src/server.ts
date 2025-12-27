import { app } from '@/app.js';
import { config, runMigrations } from '@/shared/config/index.js';

const { port } = config;

const startServer = async () => {
  try {
    // Run database migrations before starting the server
    await runMigrations();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
