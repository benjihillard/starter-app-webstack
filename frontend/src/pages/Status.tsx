import { useState, useEffect } from 'react';

interface HealthResponse {
  status: string;
  database: string;
}

function Status() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = () => {
    setLoading(true);
    setError(null);
    fetch('/api/health')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div>
      <h2>API Status</h2>
      <button type="button" onClick={fetchStatus} disabled={loading}>
        {loading ? 'Fetching...' : 'Refresh'}
      </button>
      <h3>Response:</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <pre
          style={{
            background: '#f4f4f4',
            padding: '1rem',
            borderRadius: '4px',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default Status;
