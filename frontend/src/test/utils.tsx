import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { counterReducer } from '@/features/counter';

export const createTestStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
    },
  });

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

interface WrapperProps {
  children: React.ReactNode;
}

export const createWrapper = (store = createTestStore(), queryClient = createTestQueryClient()) => {
  function Wrapper({ children }: WrapperProps) {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      </QueryClientProvider>
    );
  }
  return Wrapper;
};

export const renderWithProviders = (
  ui: ReactElement,
  {
    store = createTestStore(),
    queryClient = createTestQueryClient(),
    ...renderOptions
  }: {
    store?: ReturnType<typeof createTestStore>;
    queryClient?: QueryClient;
  } & Omit<RenderOptions, 'wrapper'> = {},
) => {
  const Wrapper = createWrapper(store, queryClient);
  return {
    store,
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
