import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestStore, createTestQueryClient } from '@/test';
import App from '@/app/App';
import About from '@/pages/About';
import CounterPage from '@/pages/CounterPage';
import HealthPage from '@/pages/HealthPage';

const renderApp = (initialRoute = '/') => {
  const store = createTestStore();
  const queryClient = createTestQueryClient();
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
        children: [
          { index: true, element: <About /> },
          { path: 'counter', element: <CounterPage /> },
          { path: 'health', element: <HealthPage /> },
        ],
      },
    ],
    { initialEntries: [initialRoute] },
  );

  return render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>,
  );
};

describe('App Integration', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', database: 'connected' }),
    } as Response);
  });

  it('renders the app shell', () => {
    renderApp();
    expect(screen.getByText('Starter App')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders home page (About) by default', () => {
    renderApp('/');
    expect(screen.getByText(/Supercharged Starter Stack/i)).toBeInTheDocument();
  });

  it('navigates to Counter page', () => {
    renderApp('/counter');
    expect(screen.getByRole('heading', { name: 'Redux Counter' })).toBeInTheDocument();
  });

  it('navigates to Health page', () => {
    renderApp('/health');
    expect(screen.getByRole('heading', { name: 'Health Check' })).toBeInTheDocument();
  });
});
