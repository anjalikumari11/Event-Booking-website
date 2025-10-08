import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
