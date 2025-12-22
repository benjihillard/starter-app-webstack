import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import ReduxExample from './pages/ReduxExample/index';
import About from './pages/About/index';
import Status from './pages/Status/index';
import exampleReducer from './store/slices/example';

const createTestStore = () =>
  configureStore({
    reducer: {
      example: exampleReducer,
    },
  });

const renderApp = (initialRoute = '/', store = createTestStore()) => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
        children: [
          { index: true, element: <About /> },
          { path: 'redux', element: <ReduxExample /> },
          { path: 'status', element: <Status /> },
        ],
      },
    ],
    { initialEntries: [initialRoute] },
  );

  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
};

describe('App Integration', () => {
  it('renders the app shell', () => {
    renderApp();
    expect(screen.getByText('Starter App')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders home page (About) by default', () => {
    renderApp('/');
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });

  it('navigates to Redux page', () => {
    renderApp('/redux');
    expect(screen.getByRole('heading', { name: 'Redux Example' })).toBeInTheDocument();
  });

  it('navigates to Status page', () => {
    renderApp('/status');
    expect(screen.getByRole('heading', { name: 'API Status' })).toBeInTheDocument();
  });
});
