import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";
import type { RadioChangeEvent } from "antd";
import type { FormData, PersonalDocument } from "@/types/employee";
import { useFormData } from "./useFormData";

export interface UseVisaFormReturn {
  isUSCitizen: boolean | undefined;
  workAuthType: string | undefined;
  optStage: string;
  uploadedFiles: Record<string, UploadFile>;
  handleCitizenshipChange: (e: RadioChangeEvent) => void;
  handleWorkAuthTypeChange: (value: string) => void;
  handleFileUpload: (info: UploadChangeParam, documentType: string) => void;
  handleI983Download: () => void;
  getNextOPTStep: () => string;
  canShowNextOPTStep: (requiredStep: string) => boolean;
}

export const useVisaForm = (initialValues?: FormData): UseVisaFormReturn => {
  const { saveFormData, loadFormData } = useFormData();

  const [isUSCitizen, setIsUSCitizen] = useState<boolean | undefined>(
    initialValues?.WorkAuthorization?.IsUSCitizen,
  );
  const [workAuthType, setWorkAuthType] = useState<string | undefined>(
    initialValues?.WorkAuthorization?.Type,
  );
  const [optStage, setOptStage] = useState<string>("none");

  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, UploadFile>
  >(() => {
    const docs = initialValues?.PersonalDocuments || [];
    const map: Record<string, UploadFile> = {};
    docs.forEach((doc) => {
      if (doc.Type && doc.File) {
        map[doc.Type] = doc.File;
      }
    });

    // Set optStage based on uploaded files
    if (map["OPT_STEM_EAD"]) return map;
    if (map["OPT_STEM_RECEIPT"]) {
      setOptStage("receipt_uploaded");
    } else if (map["I20"]) {
      setOptStage("i20_uploaded");
    }
    return map;
  });

  const handleCitizenshipChange = useCallback(
    (e: RadioChangeEvent) => {
      const value = e.target.value;
      setIsUSCitizen(value);

      // Reset work authorization when citizenship status changes
      if (value === true) {
        setWorkAuthType(undefined);
        setOptStage("none");
      }

      // Save to form data
      const currentData = loadFormData();
      const updatedData = {
        ...currentData,
        WorkAuthorization: {
          IsUSCitizen: value,
          GreenCardHolder:
            currentData.WorkAuthorization?.GreenCardHolder ?? false,
          Type:
            value === true ? "N/A" : currentData.WorkAuthorization?.Type || "",
          OtherType: currentData.WorkAuthorization?.OtherType,
          StartDate: currentData.WorkAuthorization?.StartDate,
          EndDate: currentData.WorkAuthorization?.EndDate,
          LastModificationDate: new Date().toISOString(),
        },
      };
      saveFormData(updatedData);
    },
    [loadFormData, saveFormData],
  );

  const handleWorkAuthTypeChange = useCallback(
    (value: string) => {
      setWorkAuthType(value);

      // Reset OPT stage when work auth type changes
      if (value !== "F1(CPT/OPT)") {
        setOptStage("none");
      }

      // Save to form data
      const currentData = loadFormData();
      const updatedData = {
        ...currentData,
        WorkAuthorization: {
          IsUSCitizen: currentData.WorkAuthorization?.IsUSCitizen ?? false,
          GreenCardHolder:
            currentData.WorkAuthorization?.GreenCardHolder ?? false,
          Type: value,
          OtherType: currentData.WorkAuthorization?.OtherType,
          StartDate: currentData.WorkAuthorization?.StartDate,
          EndDate: currentData.WorkAuthorization?.EndDate,
          LastModificationDate: new Date().toISOString(),
        },
      };
      saveFormData(updatedData);
    },
    [loadFormData, saveFormData],
  );

  const handleFileUpload = useCallback(
    (info: UploadChangeParam, documentType: string) => {
      const { fileList } = info;
      const file = fileList[0];

      if (file) {
        // Update uploaded files state
        setUploadedFiles((prev) => ({
          ...prev,
          [documentType]: file,
        }));

        // Update OPT stage for F1 students
        if (workAuthType === "F1(CPT/OPT)") {
          if (documentType === "I20") {
            setOptStage("i20_uploaded");
          } else if (documentType === "OPT_STEM_RECEIPT") {
            setOptStage("receipt_uploaded");
          } else if (documentType === "OPT_STEM_EAD") {
            setOptStage("completed");
          }
        }

        // Save to form data
        const currentData = loadFormData();
        const existingDocuments = currentData.PersonalDocuments || [];

        // Remove existing document of the same type
        const filteredDocuments = existingDocuments.filter(
          (doc) => doc.Type !== documentType,
        );

        // Add new document
        const newDocument: PersonalDocument = {
          Type: documentType,
          Title: getDocumentTitle(documentType),
          Comment: `Uploaded ${documentType} document`,
          CreateDate: new Date().toISOString(),
          File: file,
        };

        const updatedData = {
          ...currentData,
          PersonalDocuments: [...filteredDocuments, newDocument],
        };

        saveFormData(updatedData);
        message.success(
          `${getDocumentTitle(documentType)} uploaded successfully!`,
        );

        // Send confirmation email message for OPT documents
        if (
          ["I20", "OPT_STEM_RECEIPT", "OPT_STEM_EAD"].includes(documentType)
        ) {
          message.info(
            "A confirmation email will be sent with information on the next steps.",
          );
        }
      }
    },
    [workAuthType, loadFormData, saveFormData],
  );

  const handleI983Download = useCallback(() => {
    // In a real application, this would download the actual I-983 form
    // For now, we'll simulate the download
    const link = document.createElement("a");
    link.href = "/documents/I-983-form.pdf"; // This would be the actual form URL
    link.download = "I-983-Form.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success("I-983 form downloaded successfully!");
  }, []);

  const getNextOPTStep = useCallback((): string => {
    switch (optStage) {
      case "none":
        return "Download I-983 and upload new I-20";
      case "i20_uploaded":
        return "Upload OPT STEM Receipt";
      case "receipt_uploaded":
        return "Upload OPT STEM EAD";
      case "completed":
        return "All documents uploaded - awaiting HR response";
      default:
        return "Download I-983 and upload new I-20";
    }
  }, [optStage]);

  const canShowNextOPTStep = useCallback(
    (requiredStep: string): boolean => {
      switch (requiredStep) {
        case "I20":
          return (
            optStage === "i20_uploaded" ||
            optStage === "receipt_uploaded" ||
            optStage === "completed"
          );
        case "OPT_STEM_RECEIPT":
          return optStage === "receipt_uploaded" || optStage === "completed";
        case "OPT_STEM_EAD":
          return optStage === "completed";
        default:
          return false;
      }
    },
    [optStage],
  );

  return {
    isUSCitizen,
    workAuthType,
    optStage,
    uploadedFiles,
    handleCitizenshipChange,
    handleWorkAuthTypeChange,
    handleFileUpload,
    handleI983Download,
    getNextOPTStep,
    canShowNextOPTStep,
  };
};

// Helper function to get document titles
const getDocumentTitle = (documentType: string): string => {
  const titles: Record<string, string> = {
    WORK_AUTHORIZATION_PROOF: "Work Authorization Document",
    I20: "I-20 Form",
    OPT_STEM_RECEIPT: "OPT STEM Receipt",
    OPT_STEM_EAD: "OPT STEM EAD",
  };
  return titles[documentType] || documentType;
};
