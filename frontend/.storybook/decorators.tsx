import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from '../src/store/slices/example';

const createStore = () =>
  configureStore({
    reducer: {
      example: exampleReducer,
    },
  });

const queryClient = new QueryClient({ 
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const withProviders = (Story: React.ComponentType) => {
  const store = createStore();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Story />
      </Provider>
    </QueryClientProvider>
  );
};

