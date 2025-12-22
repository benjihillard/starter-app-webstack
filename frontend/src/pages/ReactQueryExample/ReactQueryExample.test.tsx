import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import ReactQueryExample from './ReactQueryExample';

describe('ReactQueryExample', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders heading', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);

    renderWithProviders(<ReactQueryExample />);
    expect(screen.getByRole('heading', { name: 'React Query Example' })).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);

    renderWithProviders(<ReactQueryExample />);
    expect(screen.getByText('Fetching...')).toBeInTheDocument();
  });

  it('displays data after fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);

    renderWithProviders(<ReactQueryExample />);

    await waitFor(() => {
      expect(screen.getByText(/"status": "ok"/)).toBeInTheDocument();
    });
  });

  it('displays error on fetch failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    renderWithProviders(<ReactQueryExample />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});
