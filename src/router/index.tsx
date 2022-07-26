import React from "react";
import { Navigate } from "react-router-dom";
import Chat from "../pages/Chat/Chat";
import Login from "../pages/Login/Login";

export const privateRoutes = [
  { path: "/chat", element: <Chat /> },
  { path: "*", element: <Navigate to="/chat" replace /> },
];

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "*", element: <Navigate to="/login" replace /> },
];
