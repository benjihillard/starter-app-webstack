import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test';
import Counter from './Counter';

describe('Counter', () => {
  it('renders increment and decrement buttons', () => {
    renderWithProviders(<Counter />);
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
  });

  it('renders input with initial value', () => {
    renderWithProviders(<Counter />);
    expect(screen.getByRole('spinbutton')).toHaveValue(0);
  });

  it('increments value when + button is clicked', () => {
    renderWithProviders(<Counter />);
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
  });

  it('decrements value when - button is clicked', () => {
    renderWithProviders(<Counter />);
    fireEvent.click(screen.getByRole('button', { name: '-' }));
    expect(screen.getByRole('spinbutton')).toHaveValue(-1);
  });

  it('updates value via input', () => {
    renderWithProviders(<Counter />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '42' } });
    expect(screen.getByRole('spinbutton')).toHaveValue(42);
  });
});
