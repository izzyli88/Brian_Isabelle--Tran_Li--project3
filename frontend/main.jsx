import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Rules from "./pages/Rules";
import HighScores from "./pages/HighScores";
import NormalMode from "./pages/normal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/NavBar";

import "./styles/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/rules",
    element: (
      <>
        <Navbar />
        <Rules />
      </>
    ),
  },
  {
    path: "/highscores",
    element: (
      <>
        <Navbar />
        <HighScores />
      </>
    ),
  },
  {
    path: "/game",
    element: (
      <>
        <Navbar />
        <NormalMode />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <Register />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
