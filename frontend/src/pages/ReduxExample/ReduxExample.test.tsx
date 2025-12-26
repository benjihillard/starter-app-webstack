import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test';
import ReduxExample from './ReduxExample';

describe('ReduxExample', () => {
  it('renders heading', () => {
    renderWithProviders(<ReduxExample />);
    expect(screen.getByRole('heading', { name: 'Redux Example' })).toBeInTheDocument();
  });

  it('displays initial value of 0', () => {
    renderWithProviders(<ReduxExample />);
    expect(screen.getByText('Value: 0')).toBeInTheDocument();
  });

  it('renders the Counter component', () => {
    renderWithProviders(<ReduxExample />);
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });
});
