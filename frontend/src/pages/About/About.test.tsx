import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './index';

describe('About', () => {
  it('renders heading', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<About />);
    expect(screen.getByText(/full-stack starter/i)).toBeInTheDocument();
  });
});
