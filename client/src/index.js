import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Videogames from './pages/Videogames';
import Reviews from './pages/Reviews';
import Consoles from './pages/Consoles';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/reviews/:gameId",
    element: <Reviews/>
  },
  {
    path: "/consoles/:gameId",
    element: <Consoles/>
  }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();