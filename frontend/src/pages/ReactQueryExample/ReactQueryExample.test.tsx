import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactQueryExample from './ReactQueryExample';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithQueryClient = () => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ReactQueryExample />
    </QueryClientProvider>,
  );
};

describe('ReactQueryExample', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders heading', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);

    renderWithQueryClient();
    expect(screen.getByRole('heading', { name: 'React Query Example' })).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);

    renderWithQueryClient();
    expect(screen.getByText('Fetching...')).toBeInTheDocument();
  });

  it('displays data after fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);

    renderWithQueryClient();

    await waitFor(() => {
      expect(screen.getByText(/"status": "ok"/)).toBeInTheDocument();
    });
  });

  it('displays error on fetch failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    renderWithQueryClient();

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});
