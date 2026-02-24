import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = ({ requiredRole }) => {
    const { user, loading, hasPermission } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    if (requiredRole && !hasPermission(requiredRole)) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
