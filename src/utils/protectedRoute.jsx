import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../states/AuthContext"; // Adjust path as needed

const ProtectedRoute = ({ allowedRoles }) => {
    const { currentUser } = useAuth(); 
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // Check if user role is allowed
    console.log(currentUser)
    if (!allowedRoles.includes(currentUser.role.name)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
