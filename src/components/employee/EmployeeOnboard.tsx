import React from "react";
import { StepsForm } from "@ant-design/pro-components";
import { message } from "antd";
import dayjs from "dayjs";
import { useOnboardingData } from "@/hooks/useOnboardingData";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";
import { NameInfoForm } from "@/components/forms/NameInfoForm";
import { ContactInfoForm } from "@/components/forms/ContactInfoForm";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { AddressInfoForm } from "@/components/forms/AddressInfoForm";
import type {
  BasicInfoFormData,
  OnboardingData,
  PersonalDocument,
} from "@/types/employee";

const EmployeeOnboard: React.FC = () => {
  const { loadOnboardingData, updateOnboardingData } = useOnboardingData();
  const { avatarUrl, setAvatarUrl } = useAvatarUpload();

  const handleStepFinish = async (
    values: BasicInfoFormData,
  ): Promise<boolean> => {
    console.log("handleStepFinish called with values:", values);

    try {
      const existingData: OnboardingData = loadOnboardingData();

      const preparedValues: Partial<OnboardingData> = {
        ...values,
        DOB: values.DOB ? dayjs(values.DOB).toISOString() : undefined,
      };

      const updatedData: OnboardingData = {
        ...existingData,
        ...preparedValues,
        ID: existingData.ID || `emp_${Date.now()}`,
        UserID: existingData.UserID || `user_auth_${Date.now()}`,
        ApplicationType: "ONBOARDING",
        Contact: existingData.Contact || [],
        VisaStatus: existingData.VisaStatus || [],
        PersonalDocument: existingData.PersonalDocument || [],
      };

      if (values.DOB) {
        updatedData.DOB = dayjs(values.DOB).toISOString();
      }

      if (values.CurrentAddress) {
        updatedData.Address = [
          {
            ID: existingData.Address?.[0]?.ID || `addr_${Date.now()}`,
            AddressLine1: values.CurrentAddress.AddressLine1,
            AddressLine2: values.CurrentAddress.AddressLine2 || "",
            City: values.CurrentAddress.City,
            State: values.CurrentAddress.State,
            ZipCode: values.CurrentAddress.ZipCode,
          },
        ];
      }

      if (values.avatar && values.avatar.length > 0) {
        const avatarDoc: PersonalDocument = {
          ID: `doc_avatar_${Date.now()}`,
          Path: avatarUrl,
          Title: "Profile Picture",
          Comment: "Employee avatar image",
          CreateDate: new Date().toISOString(),
        };

        updatedData.PersonalDocument = (
          updatedData.PersonalDocument || []
        ).filter((doc: PersonalDocument) => doc.Title !== "Profile Picture");

        updatedData.PersonalDocument.push(avatarDoc);
      }

      updateOnboardingData(updatedData);
      console.log("Step data saved successfully:", updatedData);
      return true;
    } catch (error) {
      console.error("Error saving step data:", error);
      message.error("Failed to save step data");
      return false;
    }
  };

  const onFinish = async (values: BasicInfoFormData): Promise<boolean> => {
    try {
      await handleStepFinish(values);
      message.success("Onboarding information saved successfully!");

      const finalData = loadOnboardingData();
      console.log("Complete Onboarding Data:", finalData);

      return true;
    } catch (error) {
      message.error("Failed to save onboarding information");
      console.error("Error saving final data:", error);
      return false;
    }
  };

  const getInitialValues = (): BasicInfoFormData => {
    const savedData: OnboardingData = loadOnboardingData();
    console.log("Loading initial values:", savedData);

    const avatarDoc = savedData.PersonalDocument?.find(
      (doc: PersonalDocument) => doc.Title === "Profile Picture",
    );
    if (avatarDoc) {
      setAvatarUrl(avatarDoc.Path);
    }

    return {
      FirstName: savedData.FirstName || "",
      LastName: savedData.LastName || "",
      MiddleName: savedData.MiddleName || "",
      PreferredName: savedData.PreferredName || "",
      Email: savedData.Email || "",
      CellPhone: savedData.CellPhone || "",
      AlternatePhone: savedData.AlternatePhone || "",
      Gender: savedData.Gender || "",
      SSN: savedData.SSN || "",
      DOB: savedData.DOB ? dayjs(savedData.DOB) : undefined,
      CurrentAddress: {
        AddressLine1: savedData.Address?.[0]?.AddressLine1 || "",
        AddressLine2: savedData.Address?.[0]?.AddressLine2 || "",
        City: savedData.Address?.[0]?.City || "",
        State: savedData.Address?.[0]?.State || "",
        ZipCode: savedData.Address?.[0]?.ZipCode || "",
      },
    };
  };

  const initialValues = getInitialValues();

  return (
    <StepsForm<BasicInfoFormData>
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
        <NameInfoForm initialValues={initialValues} />
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
        <ContactInfoForm initialValues={initialValues} />
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
        <PersonalInfoForm initialValues={initialValues} />
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
        <AddressInfoForm initialValues={initialValues} />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default EmployeeOnboard;
