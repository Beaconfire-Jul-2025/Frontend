import { useState, useEffect } from "react";
import type { FormData } from "@/types/employee";

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({});

  const loadFormData = (): FormData => {
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

  const saveFormData = (data: FormData): void => {
    try {
      localStorage.setItem("onboarding_data", JSON.stringify(data));
      setFormData(data);
    } catch (error) {
      console.error("Error saving data:", error);
      throw error;
    }
  };

  const updateFormData = (updates: FormData): void => {
    const existingData = loadFormData();
    const updatedData = { ...existingData, ...updates };
    saveFormData(updatedData);
  };

  const removeFormData = (): void => {
    localStorage.removeItem("onboarding_data");
    setFormData({});
  };

  useEffect(() => {
    setFormData(loadFormData());
  }, []);

  return {
    formData,
    loadFormData,
    saveFormData,
    updateFormData,
    removeFormData,
  };
};
