import { useState, useEffect } from 'react';

interface HealthStatus {
  status: string;
  database: string;
}

function App() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: 'error', database: 'unreachable' }));
  }, []);

  return (
    <div>
      <h1>Starter App</h1>
      <p>Backend Status: {health ? health.status : 'Loading...'}</p>
      <p>Database: {health ? health.database : 'Loading...'}</p>
    </div>
  );
}

export default App;
