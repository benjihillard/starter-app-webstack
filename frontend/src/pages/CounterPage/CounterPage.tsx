import { useAppSelector } from '@/store/hooks';
import { Counter } from '@/features/counter';
import styles from './CounterPage.module.css';

function CounterPage() {
  const value = useAppSelector((state) => state.counter.value);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Redux Counter</h1>
      <p className={styles.value}>Value: {value}</p>
      <Counter />
    </div>
  );
}

export default CounterPage;
