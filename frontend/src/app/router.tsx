import { createBrowserRouter } from 'react-router-dom';
import App from '@/app/App';
import About from '@/pages/About';
import CounterPage from '@/pages/CounterPage';
import HealthPage from '@/pages/HealthPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <About /> },
      { path: 'counter', element: <CounterPage /> },
      { path: 'health', element: <HealthPage /> },
    ],
  },
]);
