import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test';
import HealthCheck from './HealthCheck';

describe('HealthCheck', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders refresh button', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);

    renderWithProviders(<HealthCheck />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);

    renderWithProviders(<HealthCheck />);
    expect(screen.getByText('Fetching...')).toBeInTheDocument();
  });

  it('displays data after fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);

    renderWithProviders(<HealthCheck />);

    await waitFor(() => {
      expect(screen.getByText(/"status": "ok"/)).toBeInTheDocument();
    });
  });

  it('displays error on fetch failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    renderWithProviders(<HealthCheck />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});
