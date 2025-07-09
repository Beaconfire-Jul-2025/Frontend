import React from 'react';
import {Navigate} from 'react-router-dom';
import type {User} from '../../types/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, requiredRole}) => {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');

    if (!token) {
        return <Navigate to="/login" replace/>;
    }

    if (requiredRole && userStr) {
        const user: User = JSON.parse(userStr);
        if (user.role !== requiredRole) {
            const redirectPath = user.role === 'HR' ? '/hr-dashboard' : '/employee-dashboard';
            return <Navigate to={redirectPath} replace/>;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;