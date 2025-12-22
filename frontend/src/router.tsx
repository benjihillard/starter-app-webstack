import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import ReduxExample from './pages/ReduxExample';
import Status from './pages/Status';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <About /> },
      { path: 'redux', element: <ReduxExample /> },
      { path: 'status', element: <Status /> },
    ],
  },
]);
