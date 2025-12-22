import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './index';

const renderNavbar = () =>
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>,
  );

describe('Navbar', () => {
  it('renders all navigation links', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Redux' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Status' })).toBeInTheDocument();
  });

  it('links have correct hrefs', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Redux' })).toHaveAttribute('href', '/redux');
    expect(screen.getByRole('link', { name: 'Status' })).toHaveAttribute('href', '/status');
  });
});
