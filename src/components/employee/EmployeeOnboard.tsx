import React from "react";
import {
  StepsForm,
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
} from "@ant-design/pro-components";
import { message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useOnboardingData } from "@/hooks/useOnboardingData";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";
import type {
  BasicInfoFormData,
  OnboardingData,
  PersonalDocument,
} from "@/types/employee";

const EmployeeOnboard: React.FC = () => {
  const { loadOnboardingData, updateOnboardingData } = useOnboardingData();
  const { avatarUrl, setAvatarUrl } = useAvatarUpload();

  const disableDOBDates = (current: Dayjs): boolean => {
    // Disable dates after today
    const isFutureDate = current && current > dayjs().endOf("day");

    // Disable dates that would make the user younger than 16
    const isUnder16 = current && current.isAfter(dayjs().subtract(16, "year"));

    // Return true if it's a future date OR if the person would be under 16
    return isFutureDate || isUnder16;
  };

  const handleStepFinish = async (
    values: BasicInfoFormData,
  ): Promise<boolean> => {
    console.log("handleStepFinish called with values:", values);

    try {
      // Get existing onboarding data
      const existingData: OnboardingData = loadOnboardingData();

      const preparedValues: Partial<OnboardingData> = {
        ...values,
        DOB: values.DOB ? dayjs(values.DOB).toISOString() : undefined,
      };

      // Merge the new step data with existing data
      const updatedData: OnboardingData = {
        ...existingData,
        ...preparedValues,
        ID: existingData.ID || `emp_${Date.now()}`,
        UserID: existingData.UserID || `user_auth_${Date.now()}`,
        ApplicationType: "ONBOARDING",
        // Initialize arrays if they don't exist
        Contact: existingData.Contact || [],
        VisaStatus: existingData.VisaStatus || [],
        PersonalDocument: existingData.PersonalDocument || [],
      };

      // Handle DOB conversion if present
      if (values.DOB) {
        updatedData.DOB = dayjs(values.DOB).toISOString();
      }

      // Handle Address update if present
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

      // Handle avatar document if present
      if (values.avatar && values.avatar.length > 0) {
        const avatarDoc: PersonalDocument = {
          ID: `doc_avatar_${Date.now()}`,
          Path: avatarUrl,
          Title: "Profile Picture",
          Comment: "Employee avatar image",
          CreateDate: new Date().toISOString(),
        };

        // Remove existing avatar document if present
        updatedData.PersonalDocument = (
          updatedData.PersonalDocument || []
        ).filter((doc: PersonalDocument) => doc.Title !== "Profile Picture");

        // Add new avatar document
        updatedData.PersonalDocument.push(avatarDoc);
      }

      // Save updated data
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
      // Final save with success message
      await handleStepFinish(values);
      message.success("Onboarding information saved successfully!");

      // Log the complete data structure
      const finalData = loadOnboardingData();
      console.log("Complete Onboarding Data:", finalData);

      return true;
    } catch (error) {
      message.error("Failed to save onboarding information");
      console.error("Error saving final data:", error);
      return false;
    }
  };

  // Load initial data for the form
  const getInitialValues = (): BasicInfoFormData => {
    const savedData: OnboardingData = loadOnboardingData();
    console.log("Loading initial values:", savedData);

    // Set avatar if exists
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

  return (
    <StepsForm<BasicInfoFormData>
      onFinish={onFinish}
      formProps={{
        layout: "vertical",
        size: "large",
        validateMessages: {
          required: "This field is required",
        },
        onValuesChange: (changedValues, allValues: BasicInfoFormData) => {
          console.log("Form values changed:", changedValues, allValues);
        },
        onFinishFailed: (errorInfo) => {
          console.log("Form validation failed:", errorInfo);
        },
        initialValues: getInitialValues(),
      }}
      stepsProps={{
        size: "default",
        className: "mb-8",
      }}
    >
      {/* Step 1: Basic Name Information */}
      <StepsForm.StepForm
        name="nameInfo"
        title="Name Information"
        stepProps={{
          description: "Please provide your name details",
        }}
        onFinish={async (values: BasicInfoFormData): Promise<boolean> => {
          console.log("Step 1 onFinish called with:", values);
          return await handleStepFinish(values);
        }}
        layout="vertical"
      >
        <div className="max-w-2xl">
          <ProFormText
            name="FirstName"
            label="First Name *"
            placeholder="Enter your first name"
            rules={[
              { required: true, message: "Please enter your first name" },
              { min: 2, message: "First name must be at least 2 characters" },
            ]}
            className="mb-4"
          />

          <ProFormText
            name="LastName"
            label="Last Name *"
            placeholder="Enter your last name"
            rules={[
              { required: true, message: "Please enter your last name" },
              { min: 2, message: "Last name must be at least 2 characters" },
            ]}
            className="mb-4"
          />

          <ProFormText
            name="MiddleName"
            label="Middle Name"
            placeholder="Enter your middle name (optional)"
            className="mb-4"
          />

          <ProFormText
            name="PreferredName"
            label="Preferred Name"
            placeholder="Enter your preferred name (optional)"
            className="mb-4"
          />
        </div>
      </StepsForm.StepForm>

      {/* Step 2: Contact Information */}
      <StepsForm.StepForm
        name="contactInfo"
        title="Contact Information"
        stepProps={{
          description: "Please provide your contact details",
        }}
        onFinish={async (values: BasicInfoFormData): Promise<boolean> => {
          console.log("Step 2 onFinish called with:", values);
          return await handleStepFinish(values);
        }}
        layout="vertical"
      >
        <div className="max-w-2xl">
          <ProFormText
            name="Email"
            label="Email Address *"
            placeholder="Enter your email address"
            rules={[
              { required: true, message: "Please enter your email" },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
            fieldProps={{
              disabled: false, // Pre-filled and not editable as per spec
            }}
            className="mb-4"
          />

          <ProFormText
            name="CellPhone"
            label="Cell Phone *"
            placeholder="Enter your cell phone number"
            rules={[
              {
                required: true,
                message: "Please enter your cell phone number",
              },
              {
                pattern: /^\d{10}$/,
                message: "Please enter phone in US format",
              },
            ]}
            className="mb-4"
          />

          <ProFormText
            name="AlternatePhone"
            label="Work Phone"
            placeholder="Enter your work phone number (optional)"
            rules={[
              {
                pattern: /^\d{10}$/,
                message: "Please enter phone in US format",
              },
            ]}
            className="mb-4"
          />
        </div>
      </StepsForm.StepForm>

      {/* Step 3: Personal Information */}
      <StepsForm.StepForm
        name="personalInfo"
        title="Personal Information"
        stepProps={{
          description: "Please provide your personal details",
        }}
        onFinish={async (values: BasicInfoFormData): Promise<boolean> => {
          console.log("Step 3 onFinish called with:", values);
          return await handleStepFinish(values);
        }}
        layout="vertical"
      >
        <div className="max-w-2xl">
          <ProFormSelect
            name="Gender"
            label="Gender"
            placeholder="Select your gender (optional)"
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Other", value: "Other" },
              { label: "I Prefer Not to Say", value: "I Prefer Not to Say" },
            ]}
            className="mb-4"
          />

          <ProFormText
            name="SSN"
            label="Social Security Number *"
            placeholder="Enter your SSN (XXX-XX-XXXX)"
            rules={[
              { required: true, message: "Please enter your SSN" },
              {
                pattern: /^\d{3}-\d{2}-\d{4}$/,
                message: "Please enter SSN in format: XXX-XX-XXXX",
              },
            ]}
            className="mb-4"
          />

          <ProFormDatePicker
            name="DOB"
            label="Date of Birth *"
            placeholder="Select your date of birth"
            rules={[
              { required: true, message: "Please select your date of birth" },
            ]}
            fieldProps={{
              format: "MM/DD/YYYY",
              disabledDate: disableDOBDates,
            }}
            className="mb-4"
          />
        </div>
      </StepsForm.StepForm>

      {/* Step 4: Address Information */}
      <StepsForm.StepForm
        name="addressInfo"
        title="Address Information"
        stepProps={{
          description: "Please provide your current address",
        }}
        onFinish={async (values: BasicInfoFormData): Promise<boolean> => {
          console.log("Step 4 onFinish called with:", values);
          return await handleStepFinish(values);
        }}
        layout="vertical"
      >
        <div className="max-w-4xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Current Address *
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProFormText
              name={["CurrentAddress", "AddressLine1"]}
              label="Address Line 1 *"
              placeholder="Enter your street address"
              rules={[{ required: true, message: "Please enter your address" }]}
              className="mb-4"
            />

            <ProFormText
              name={["CurrentAddress", "AddressLine2"]}
              label="Address Line 2"
              placeholder="Apartment, suite, unit, etc. (optional)"
              className="mb-4"
            />

            <ProFormText
              name={["CurrentAddress", "City"]}
              label="City *"
              placeholder="Enter your city"
              rules={[{ required: true, message: "Please enter your city" }]}
              className="mb-4"
            />

            <ProFormText
              name={["CurrentAddress", "State"]}
              label="State *"
              placeholder="Enter your state"
              rules={[
                { required: true, message: "Please enter your state" },
                {
                  len: 2,
                  message: "Please enter state as 2-letter code (e.g., NY)",
                },
              ]}
              className="mb-4"
            />

            <div className="md:col-span-2">
              <ProFormText
                name={["CurrentAddress", "ZipCode"]}
                label="ZIP Code *"
                placeholder="Enter your ZIP code"
                rules={[
                  { required: true, message: "Please enter your ZIP code" },
                  {
                    pattern: /^\d{5}(-\d{4})?$/,
                    message: "Please enter a valid ZIP code",
                  },
                ]}
                className="mb-4 max-w-xs"
              />
            </div>
          </div>
        </div>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default EmployeeOnboard;
