import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from ".";

function ProtectedRoute() {
    const auth = useAuth();

    if (auth.isLoading) return <p>spinner</p>;

    if (!auth.isLoggedIn) return <Navigate to="/login" replace />;

    return <Outlet />;
}

export default ProtectedRoute;
