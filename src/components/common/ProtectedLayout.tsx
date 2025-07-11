import { Navigate, Outlet } from "react-router-dom";
import AppLayout from "@/components/common/Layout/AppLayout";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

interface ProtectedLayoutProps {
  requiredRole: "ROLE_HR" | "ROLE_EMPLOYEE";
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  const layoutRole = user.role === "ROLE_HR" ? "HR" : "EMPLOYEE";

  return (
    <AppLayout role={layoutRole}>
      <Outlet />
    </AppLayout>
  );
};

export default ProtectedLayout;
