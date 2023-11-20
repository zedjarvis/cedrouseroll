import React from 'react';
import ReactDOM from 'react-dom/client';
import {
createBrowserRouter,
RouterProvider,
} from "react-router-dom";
import { createHead } from 'unhead';
import App from './App.tsx';
import ErrorPage from './error-page';
import './index.css';
import IndexPage from './pages/Index';

createHead()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <IndexPage />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
