import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { getUserFromLocalStorage } from "../user.actions";

export const PrivateRouteLoggedOut = () => {
  const localStorageUser = getUserFromLocalStorage();

  return localStorageUser ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export const PrivateRouteLoggedIn = () => {
  const localStorageUser = getUserFromLocalStorage();

  return localStorageUser ? <Navigate to="/" replace={true} /> : <Outlet />;
};
