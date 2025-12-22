import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test';
import ReduxExample from '@/pages/ReduxExample/ReduxExample';

describe('ReduxExample', () => {
  it('renders heading', () => {
    renderWithProviders(<ReduxExample />);
    expect(screen.getByRole('heading', { name: 'Redux Example' })).toBeInTheDocument();
  });

  it('displays initial value of 0', () => {
    renderWithProviders(<ReduxExample />);
    expect(screen.getByText('Value: 0')).toBeInTheDocument();
  });

  it('increments value when + button is clicked', () => {
    renderWithProviders(<ReduxExample />);
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('Value: 1')).toBeInTheDocument();
  });

  it('decrements value when - button is clicked', () => {
    renderWithProviders(<ReduxExample />);
    fireEvent.click(screen.getByText('-'));
    expect(screen.getByText('Value: -1')).toBeInTheDocument();
  });

  it('updates value via input', () => {
    renderWithProviders(<ReduxExample />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '42' } });
    expect(screen.getByText('Value: 42')).toBeInTheDocument();
  });
});
