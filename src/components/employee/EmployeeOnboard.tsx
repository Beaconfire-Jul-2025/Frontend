import React, { useMemo } from "react";
import { StepsForm } from "@ant-design/pro-components";
import { message } from "antd";
import dayjs from "dayjs";
import { useFormData } from "@/hooks/useFormData.ts";
import { NameInfoForm } from "@/components/forms/NameInfoForm";
import { ContactInfoForm } from "@/components/forms/ContactInfoForm";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { AddressInfoForm } from "@/components/forms/AddressInfoForm";
import { DriverLicenseForm } from "@/components/forms/DriverLicenseForm";
import type { FormData, PersonalDocument } from "@/types/employee";
import { useAvatarUpload } from "@/hooks/useAvatarUpload.ts";

const EmployeeOnboard: React.FC = () => {
  const { loadFormData, updateFormData, removeFormData } = useFormData();
  const { avatarUrl } = useAvatarUpload();

  const handleStepFinish = async (values: FormData): Promise<boolean> => {
    console.log("handleStepFinish called with values:", values);

    try {
      const existingData: FormData = loadFormData();

      const preparedValues: Partial<FormData> = {
        ...values,
        DOB: values.DOB ? dayjs(values.DOB).toISOString() : undefined,
      };

      const updatedData: FormData = {
        ...existingData,
        ...preparedValues,
        ApplicationType: "ONBOARD",
        EmergencyContacts: existingData.EmergencyContacts ?? [],
        References: existingData.References ?? [],
        PersonalDocuments: existingData.PersonalDocuments ?? [],
      };

      // Handle addresses
      if (values.Addresses && values.Addresses.length > 0) {
        // Find the primary address if it exists in the submitted values
        const primaryAddressFromForm = values.Addresses.find(
          (addr) => addr.Type === "PRIMARY",
        );

        if (primaryAddressFromForm) {
          const existingAddresses = updatedData.Addresses ?? [];
          const primaryIndex = existingAddresses.findIndex(
            (addr) => addr.Type === "PRIMARY",
          );

          if (primaryIndex >= 0) {
            // Update existing primary address
            existingAddresses[primaryIndex] = primaryAddressFromForm;
          } else {
            // Add new primary address
            existingAddresses.push(primaryAddressFromForm);
          }
          updatedData.Addresses = existingAddresses;
        }
      } else updatedData.Addresses ??= [];

      // Handle work authorization (default values)
      updatedData.WorkAuthorization = {
        IsUSCitizen: values.WorkAuthorization?.IsUSCitizen ?? true,
        GreenCardHolder: values.WorkAuthorization?.GreenCardHolder ?? false,
        Type: values.WorkAuthorization?.Type ?? "N/A",
        StartDate: values.WorkAuthorization?.StartDate
          ? dayjs(values.WorkAuthorization.StartDate).toISOString()
          : undefined,
        EndDate: values.WorkAuthorization?.EndDate
          ? dayjs(values.WorkAuthorization.EndDate).toISOString()
          : undefined,
        LastModificationDate: dayjs(
          values.WorkAuthorization?.LastModificationDate ?? new Date(),
        ).toISOString(),
      };

      // --- Driver License Handling ---
      if (values.DriverLicense) {
        updatedData.DriverLicense = {
          ...values.DriverLicense,
          ExpirationDate: values.DriverLicense.ExpirationDate
            ? dayjs(values.DriverLicense.ExpirationDate).toISOString()
            : undefined,
        };
      } else {
        updatedData.DriverLicense = {
          HasLicense: false,
          LicenseNumber: undefined,
          ExpirationDate: undefined,
        };
      }

      // --- Personal Documents Handling ---
      if (values.PersonalDocuments && values.PersonalDocuments.length > 0) {
        const driverLicenseDocFromForm = values.PersonalDocuments.find(
          (doc) => doc.Type === "DRIVER_LICENSE_PROOF",
        );

        if (driverLicenseDocFromForm) {
          // Ensure we have a valid Path from the UploadFile structure
          const docPath =
            driverLicenseDocFromForm.File?.url ??
            driverLicenseDocFromForm.File?.response?.url ??
            driverLicenseDocFromForm.Path;

          if (docPath) {
            const driverLicenseDoc: PersonalDocument = {
              Type: "DRIVER_LICENSE_PROOF",
              Path: docPath,
              Title: driverLicenseDocFromForm.Title ?? "Driver License Front",
              Comment:
                driverLicenseDocFromForm.Comment ?? "Scan of driver's license",
              CreateDate:
                driverLicenseDocFromForm.CreateDate instanceof dayjs
                  ? driverLicenseDocFromForm.CreateDate.toISOString()
                  : (driverLicenseDocFromForm.CreateDate ??
                    new Date().toISOString()),
            };

            // Remove existing driver license document if present
            updatedData.PersonalDocuments = (
              updatedData.PersonalDocuments ?? []
            ).filter(
              (doc: PersonalDocument) => doc.Type !== "DRIVER_LICENSE_PROOF",
            );

            // Add new driver license document
            updatedData.PersonalDocuments.push(driverLicenseDoc);
          }
        }
      }

      // --- Avatar Handling ---
      const avatarFiles = values.AvatarPath;
      if (avatarFiles && avatarFiles.length > 0) {
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
  };

  const onFinish = async (values: FormData): Promise<boolean> => {
    try {
      await handleStepFinish(values);
      message.success("Onboarding information saved successfully!");

      const finalData = loadFormData();
      console.log("Complete Onboarding Data:", finalData);

      removeFormData();

      return true;
    } catch (error) {
      message.error("Failed to save onboarding information");
      console.error("Error saving final data:", error);
      return false;
    }
  };

  const initialValues = useMemo(() => {
    const savedData: FormData = loadFormData();
    console.log("Loading initial values:", savedData);
    return savedData ?? {};
  }, [loadFormData]);

  return (
    <StepsForm<FormData>
      onFinish={onFinish}
      formProps={{
        layout: "vertical",
        size: "large",
        validateMessages: {
          required: "This field is required",
        },
        initialValues,
      }}
      stepsProps={{
        size: "default",
        className: "mb-8",
      }}
    >
      {/* Step 1: Name Information */}
      <StepsForm.StepForm
        name="nameInfo"
        title="Name Information"
        stepProps={{
          description: "Please provide your name details",
        }}
        onFinish={handleStepFinish}
        layout="vertical"
      >
        <NameInfoForm />
      </StepsForm.StepForm>

      {/* Step 2: Contact Information */}
      <StepsForm.StepForm
        name="contactInfo"
        title="Contact Information"
        stepProps={{
          description: "Please provide your contact details",
        }}
        onFinish={handleStepFinish}
        layout="vertical"
      >
        <ContactInfoForm />
      </StepsForm.StepForm>

      {/* Step 3: Personal Information */}
      <StepsForm.StepForm
        name="personalInfo"
        title="Personal Information"
        stepProps={{
          description: "Please provide your personal details",
        }}
        onFinish={handleStepFinish}
        layout="vertical"
      >
        <PersonalInfoForm />
      </StepsForm.StepForm>

      {/* Step 4: Address Information */}
      <StepsForm.StepForm
        name="addressInfo"
        title="Address Information"
        stepProps={{
          description: "Please provide your current address",
        }}
        onFinish={handleStepFinish}
        layout="vertical"
      >
        <AddressInfoForm />
      </StepsForm.StepForm>

      {/* Step 5: Driver License Information */}
      <StepsForm.StepForm
        name="driverLicenseInfo"
        title="Driver License Information"
        stepProps={{
          description: "Please provide your driver's license information",
        }}
        onFinish={handleStepFinish}
        layout="vertical"
      >
        <DriverLicenseForm initialValues={initialValues} />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default EmployeeOnboard;
