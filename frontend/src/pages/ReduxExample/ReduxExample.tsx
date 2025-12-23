import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { increment, decrement, setValue } from '@/store/slices/example';
import { tryParseNumber } from '@/utils';
import styles from './ReduxExample.module.css';

function ReduxExample() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.example.value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = tryParseNumber(e.target.value);
    if (num !== null) {
      dispatch(setValue(num));
    }
  };

  return (
    <div>
      <h2>Redux Example</h2>
      <p>Value: {value}</p>
      <button type="button" onClick={() => dispatch(increment())}>
        +
      </button>
      <button type="button" onClick={() => dispatch(decrement())}>
        -
      </button>
      <input type="number" value={value} onChange={handleInputChange} className={styles.input} />
    </div>
  );
}

export default ReduxExample;
