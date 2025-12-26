import { HealthCheck } from '@/features/health';
import styles from './HealthPage.module.css';

function HealthPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Health Check</h1>
      <HealthCheck />
    </div>
  );
}

export default HealthPage;
