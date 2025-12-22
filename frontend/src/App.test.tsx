import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import ReduxExample from './pages/ReduxExample';
import About from './pages/About';
import exampleReducer from './store/slices/example';

const createTestStore = () =>
  configureStore({
    reducer: {
      example: exampleReducer,
    },
  });

const renderWithProviders = (initialRoute = '/', store = createTestStore()) => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
        children: [
          { index: true, element: <About /> },
          { path: 'redux', element: <ReduxExample /> },
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

describe('App', () => {
  it('renders the heading', () => {
    renderWithProviders();
    expect(screen.getByText('Starter App')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithProviders();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Redux' })).toBeInTheDocument();
  });
});

describe('Redux page', () => {
  it('displays initial value of 0', () => {
    renderWithProviders('/redux');
    expect(screen.getByText('Value: 0')).toBeInTheDocument();
  });

  it('increments value when + button is clicked', () => {
    renderWithProviders('/redux');
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    expect(screen.getByText('Value: 1')).toBeInTheDocument();
  });

  it('decrements value when - button is clicked', () => {
    renderWithProviders('/redux');
    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);
    expect(screen.getByText('Value: -1')).toBeInTheDocument();
  });

  it('updates value via input', () => {
    renderWithProviders('/redux');
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '42' } });
    expect(screen.getByText('Value: 42')).toBeInTheDocument();
  });
});

describe('About page (home)', () => {
  it('renders about content', () => {
    renderWithProviders('/');
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByText(/full-stack starter/i)).toBeInTheDocument();
  });
});
