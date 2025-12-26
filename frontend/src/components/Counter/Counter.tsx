import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { increment, decrement, setValue } from '@/store/slices/example';
import { tryParseNumber } from '@/utils';
import styles from './Counter.module.css';

function Counter() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.example.value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = tryParseNumber(e.target.value);
    if (num !== null) {
      dispatch(setValue(num));
    }
  };

  return (
    <div className={styles.container}>
      <button
        style={{ backgroundColor: 'var(--color-orange)' }}
        className={styles.button}
        type="button"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <input type="number" value={value} onChange={handleInputChange} className={styles.input} />
      <button
        style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-cream)' }}
        className={styles.button}
        type="button"
        onClick={() => dispatch(increment())}
      >
        +
      </button>
    </div>
  );
}

export default Counter;
