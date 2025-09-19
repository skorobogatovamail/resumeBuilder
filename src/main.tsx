import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import App from './App.tsx';

import './index.css';
import Dashboard from './components/pages/Dashboard/index.tsx';
import Home from './components/pages/Home/index.tsx';
import EditResume from './components/pages/EditResume/index.tsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditResume />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
