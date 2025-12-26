import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders all navigation links', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Counter' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Health' })).toBeInTheDocument();
  });

  it('links have correct hrefs', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Counter' })).toHaveAttribute('href', '/counter');
    expect(screen.getByRole('link', { name: 'Health' })).toHaveAttribute('href', '/health');
  });
});
