// src/hooks/useFormDataSaving.ts
import { useCallback } from "react";
import { message } from "antd";
import { useFormData } from "@/hooks/useFormData.ts";
import { useAvatarUpload } from "@/hooks/useAvatarUpload.ts";
import type { FormData } from "@/types/employee";
import {
  prepareFormDataForSave,
  handleAddresses,
  handleWorkAuthorization,
  handleDriverLicense,
  handleEmergencyContacts,
  handleReferences,
} from "@/utils/formDataHelpers.ts";
import { handlePersonalDocuments } from "@/utils/documentHelpers.ts";

export const useFormDataSaving = () => {
  const { loadFormData, updateFormData } = useFormData();
  const { avatarUrl } = useAvatarUpload();

  const saveStepData = useCallback(
    async (values: FormData): Promise<boolean> => {
      console.log("saveStepData called with values:", values);
      try {
        const existingData: FormData = loadFormData();

        let updatedData: FormData = {
          ...existingData,
          ...prepareFormDataForSave(values),
          ApplicationType: "ONBOARD",
          EmergencyContacts: existingData.EmergencyContacts ?? [],
          References: existingData.References ?? [],
          PersonalDocuments: existingData.PersonalDocuments ?? [],
        };

        updatedData = handleAddresses(values, updatedData);
        updatedData = handleWorkAuthorization(values, updatedData);
        updatedData = handleDriverLicense(values, updatedData);
        updatedData = handlePersonalDocuments(values, updatedData);
        updatedData = handleEmergencyContacts(values, updatedData);
        updatedData = handleReferences(values, updatedData);

        // Handle Avatar
        if (values.AvatarPath && values.AvatarPath.length > 0) {
          updatedData.AvatarPath = avatarUrl;
        } else if (values.AvatarPath) {
          updatedData.AvatarPath = values.AvatarPath;
        }

        updateFormData(updatedData);
        console.log("Step data saved successfully:", updatedData);
        return true;
      } catch (error) {
        console.error("Error saving step data:", error);
        message.error("Failed to save step data");
        return false;
      }
    },
    [loadFormData, updateFormData, avatarUrl],
  );

  return { saveStepData };
};
