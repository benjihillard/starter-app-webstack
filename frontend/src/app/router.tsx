import { createBrowserRouter } from 'react-router-dom';
import App from '@/app/App';
import About from '@/pages/About';
import ReduxExample from '@/pages/ReduxExample';
import ReactQueryExample from '@/pages/ReactQueryExample';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <About /> },
      { path: 'redux', element: <ReduxExample /> },
      { path: 'react-query', element: <ReactQueryExample /> },
    ],
  },
]);
