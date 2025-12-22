import { useAppDispatch, useAppSelector } from '../store/hooks';
import { increment, decrement, setValue } from '../store/slices/example';

function ReduxExample() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.example.value);

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
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const num = Number(e.target.value);
          if (!Number.isNaN(num)) {
            dispatch(setValue(num));
          }
        }}
        style={{ margin: '0 8px' }}
      />
    </div>
  );
}

export default ReduxExample;
