import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MyPokemon from "./pokemon/MyPokemon";
import React from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pokemon/login";
import AllPokemon from "./Pokemon/AllPokemon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyPokemon />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/all",
    element: <AllPokemon />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
