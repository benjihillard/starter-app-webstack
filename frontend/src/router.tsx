import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import About from './pages/About/index';
import ReduxExample from './pages/ReduxExample/index';
import Status from './pages/Status/index';

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
