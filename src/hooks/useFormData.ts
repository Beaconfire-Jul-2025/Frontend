import { useState, useEffect, useCallback } from "react";
import type { FormData } from "@/types/employee";

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({});

  const loadFormData = useCallback((): FormData => {
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
  }, []);

  const saveFormData = useCallback((data: FormData): void => {
    try {
      localStorage.setItem("onboarding_data", JSON.stringify(data));
      setFormData(data);
    } catch (error) {
      console.error("Error saving data:", error);
      throw error;
    }
  }, []);

  const updateFormData = useCallback(
    (updates: FormData): void => {
      const existingData = loadFormData();
      const updatedData = { ...existingData, ...updates };
      saveFormData(updatedData);
    },
    [loadFormData, saveFormData],
  );

  const removeFormData = useCallback((): void => {
    localStorage.removeItem("onboarding_data");
    setFormData({});
  }, []);

  useEffect(() => {
    setFormData(loadFormData());
  }, [loadFormData]);

  return {
    formData,
    loadFormData,
    saveFormData,
    updateFormData,
    removeFormData,
  };
};
