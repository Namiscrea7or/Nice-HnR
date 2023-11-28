import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Book from './pages/book/Book';
import BookRooms from './pages/book/book-rooms/BookRooms';
import BookTable from './pages/book/table-form/BookTable';
import RoomsPage from './pages/RoomsPage/RoomsPage';
import Menu from './pages/menu/Menu';
import Staff from './pages/staff/Staff';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "book",
    element: <Book />,
  },
  {
    path: "book-rooms",
    element: <BookRooms />,
  },
  {
    path: "book-tables",
    element: <BookTable/>,
  },
  {
    path: "rooms-page",
    element: <RoomsPage/>,
  },
  {
    path: "menu",
    element: <Menu/>,
  },
  {
    path: "staff",
    element: <Staff />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


