import { useHealth } from '../../hooks';
import styles from './HealthCheck.module.css';

function HealthCheck() {
  const { data, isLoading, error, refetch } = useHealth();

  return (
    <div className={styles.container}>
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

export default HealthCheck;
