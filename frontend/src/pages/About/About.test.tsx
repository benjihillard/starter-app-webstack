import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders the feature list', () => {
    render(<About />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders description content', () => {
    render(<About />);
    expect(screen.getByText(/Supercharged Starter Stack/i)).toBeInTheDocument();
  });
});
