import { useState, useEffect } from "react";
import type { OnboardingData } from "@/types/employee";

export const useOnboardingData = () => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  const loadOnboardingData = (): OnboardingData => {
    const savedData = localStorage.getItem("onboarding_data");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Error parsing saved data:", error);
        return {};
      }
    }
    return {};
  };

  const saveOnboardingData = (data: OnboardingData): void => {
    try {
      localStorage.setItem("onboarding_data", JSON.stringify(data));
      setOnboardingData(data);
    } catch (error) {
      console.error("Error saving data:", error);
      throw error;
    }
  };

  const updateOnboardingData = (updates: Partial<OnboardingData>): void => {
    const existingData = loadOnboardingData();
    const updatedData = { ...existingData, ...updates };
    saveOnboardingData(updatedData);
  };

  useEffect(() => {
    setOnboardingData(loadOnboardingData());
  }, []);

  return {
    onboardingData,
    loadOnboardingData,
    saveOnboardingData,
    updateOnboardingData,
  };
};
