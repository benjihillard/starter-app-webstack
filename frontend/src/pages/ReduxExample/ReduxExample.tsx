import Counter from '@/components/Counter';
import styles from './ReduxExample.module.css';

function ReduxExample() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Redux Example</h1>
      <Counter />
    </div>
  );
}

export default ReduxExample;
