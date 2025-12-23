import { useHealth } from '@/hooks/api';
import styles from './ReactQueryExample.module.css';

function ReactQueryExample() {
  const { data, isLoading, error, refetch } = useHealth();

  return (
    <div>
      <h2>React Query Example</h2>
      <button type="button" onClick={() => refetch()} disabled={isLoading}>
        {isLoading ? 'Fetching...' : 'Refresh'}
      </button>
      <h3>Response:</h3>
      {error && <p className={styles.error}>Error: {error.message}</p>}
      {data && <pre className={styles.codeBlock}>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default ReactQueryExample;
