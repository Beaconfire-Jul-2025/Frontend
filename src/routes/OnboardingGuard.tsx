import React from "react";
import { Navigate } from "react-router-dom";
import { getUser, isAuthenticated } from "@/utils/authUtils.ts";
import OnboardingForm from "@/features/onboarding/OnboardingForm.tsx";

const OnboardingGuard: React.FC = () => {
  const user = getUser();

  if (!isAuthenticated() || !user) {
    return <Navigate to="/login" replace />;
  }

  return <OnboardingForm />;
};

export default OnboardingGuard;
