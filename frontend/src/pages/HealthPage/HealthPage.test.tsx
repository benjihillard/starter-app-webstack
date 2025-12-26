import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test';
import HealthPage from './HealthPage';

describe('HealthPage', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);
  });

  it('renders heading', () => {
    renderWithProviders(<HealthPage />);
    expect(screen.getByRole('heading', { name: 'Health Check' })).toBeInTheDocument();
  });

  it('renders the HealthCheck component', () => {
    renderWithProviders(<HealthPage />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
