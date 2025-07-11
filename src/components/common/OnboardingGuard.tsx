import React from "react";
import { Navigate } from "react-router-dom";
import { getUser, isAuthenticated } from "@/utils/authUtils";
import EmployeeOnboard from "@/pages/employee/EmployeeOnboard.tsx";

const OnboardingGuard: React.FC = () => {
  const user = getUser();

  if (!isAuthenticated() || !user) {
    return <Navigate to="/login" replace />;
  }

  return <EmployeeOnboard />;
};

export default OnboardingGuard;
