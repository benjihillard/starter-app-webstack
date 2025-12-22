import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Status from './index';

describe('Status', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders heading', () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);

    render(<Status />);
    expect(screen.getByRole('heading', { name: 'API Status' })).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);

    render(<Status />);
    expect(screen.getByText('Fetching...')).toBeInTheDocument();
  });

  it('displays data after fetch', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);

    render(<Status />);

    await waitFor(() => {
      expect(screen.getByText(/\"status\": \"ok\"/)).toBeInTheDocument();
    });
  });

  it('displays error on fetch failure', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    render(<Status />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/)).toBeInTheDocument();
    });
  });
});
