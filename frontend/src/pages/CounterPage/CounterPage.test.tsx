import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test';
import CounterPage from './CounterPage';

describe('CounterPage', () => {
  it('renders heading', () => {
    renderWithProviders(<CounterPage />);
    expect(screen.getByRole('heading', { name: 'Redux Counter' })).toBeInTheDocument();
  });

  it('displays initial value of 0', () => {
    renderWithProviders(<CounterPage />);
    expect(screen.getByText('Value: 0')).toBeInTheDocument();
  });

  it('renders the Counter component', () => {
    renderWithProviders(<CounterPage />);
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
  });
});
