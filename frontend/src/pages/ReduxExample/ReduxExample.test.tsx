import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReduxExample from './index';
import exampleReducer from '../../store/slices/example';

const createTestStore = () =>
  configureStore({
    reducer: {
      example: exampleReducer,
    },
  });

const renderWithStore = (store = createTestStore()) =>
  render(
    <Provider store={store}>
      <ReduxExample />
    </Provider>,
  );

describe('ReduxExample', () => {
  it('renders heading', () => {
    renderWithStore();
    expect(screen.getByRole('heading', { name: 'Redux Example' })).toBeInTheDocument();
  });

  it('displays initial value of 0', () => {
    renderWithStore();
    expect(screen.getByText('Value: 0')).toBeInTheDocument();
  });

  it('increments value when + button is clicked', () => {
    renderWithStore();
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('Value: 1')).toBeInTheDocument();
  });

  it('decrements value when - button is clicked', () => {
    renderWithStore();
    fireEvent.click(screen.getByText('-'));
    expect(screen.getByText('Value: -1')).toBeInTheDocument();
  });

  it('updates value via input', () => {
    renderWithStore();
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '42' } });
    expect(screen.getByText('Value: 42')).toBeInTheDocument();
  });
});
