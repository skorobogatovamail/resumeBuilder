import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import App from './App.tsx';

import './index.css';
// Импортируем компоненты из features
import Home from './features/home/components/Home.tsx';
import Dashboard from './features/resume/components/Dashboard.tsx';
import EditResume from './features/resume/components/EditResume.tsx';

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
