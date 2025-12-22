import { useHealth } from '@/hooks/api';

function ReactQueryExample() {
  const { data, isLoading, error, refetch } = useHealth();

  return (
    <div>
      <h2>React Query Example</h2>
      <button type="button" onClick={() => refetch()} disabled={isLoading}>
        {isLoading ? 'Fetching...' : 'Refresh'}
      </button>
      <h3>Response:</h3>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
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

export default ReactQueryExample;
