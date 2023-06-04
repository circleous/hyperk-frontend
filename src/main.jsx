import React from "react";
import ReactDOM from "react-dom/client";

import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Layout from "./components/Layout";
import Error from "./components/pages/Error";
import Instances from "./components/pages/Instances";
import CreateNewInstance from "./components/pages/CreateNewInstance";
import Login from "./components/pages/Login";
import { getInstancesData, getUserData } from "./components/pages/loaders";

import { AuthProvider, ProtectedRoute } from "./auth";
import customTheme from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GoogleOAuthProvider clientId="583438906271-3ajmphde7h1743p0s2j4k6dc7n2frcnm.apps.googleusercontent.com">
        <AuthProvider>
          <React.Fragment>
            <CssBaseline />
            <Outlet />
          </React.Fragment>
        </AuthProvider>
      </GoogleOAuthProvider>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        loader: getUserData,
        children: [
          {
            path: "instances",
            element: <Instances />,
            loader: getInstancesData,
          },
          {
            path: "instances/new",
            element: <CreateNewInstance />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssVarsProvider disableTransitionOnChange theme={customTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  </React.StrictMode>
);
