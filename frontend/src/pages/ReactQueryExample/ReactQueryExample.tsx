import { useHealth } from '@/hooks/api';
import styles from './ReactQueryExample.module.css';

function ReactQueryExample() {
  const { data, isLoading, error, refetch } = useHealth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>React Query Example</h1>
      <button
        type="button"
        onClick={() => refetch()}
        disabled={isLoading}
        className={styles.button}
      >
        {isLoading ? 'Fetching...' : 'Refresh'}
      </button>
      <h3>Response:</h3>
      {error && <p className={styles.error}>Error: {error.message}</p>}
      {data && <pre className={styles.codeBlock}>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default ReactQueryExample;
