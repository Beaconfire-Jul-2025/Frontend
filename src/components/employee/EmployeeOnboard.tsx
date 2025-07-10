import React, { useEffect } from "react";
import {
  StepsForm,
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
} from "@ant-design/pro-components";
import { Form, message } from "antd";
import dayjs from "dayjs";
import { useOnboardingData } from "@/hooks/useOnboardingData";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";
import type { BasicInfoFormData } from "@/types/employee";

const EmployeeOnboard: React.FC = () => {
  const [form] = Form.useForm();
  const { loadOnboardingData, updateOnboardingData } = useOnboardingData();
  const { avatarUrl, setAvatarUrl } = useAvatarUpload();

  const disableDOBDates = (current) => {
    // Disable dates after today
    const isFutureDate = current && current > dayjs().endOf("day");

    // Disable dates that would make the user younger than 16
    const isUnder16 = current && current.isAfter(dayjs().subtract(16, "year"));

    // Return true if it's a future date OR if the person would be under 16
    return isFutureDate ?? isUnder16;
  };

  // Load existing onboarding data on component mount
  useEffect(() => {
    const savedData = loadOnboardingData();

    // Set form values with existing data
    const formData = {
      FirstName: savedData.FirstName ?? "",
      LastName: savedData.LastName || "",
      MiddleName: savedData.MiddleName || "",
      PreferredName: savedData.PreferredName || "",
      Email: savedData.Email || "",
      CellPhone: savedData.CellPhone || "",
      AlternatePhone: savedData.AlternatePhone || "",
      Gender: savedData.Gender || "",
      SSN: savedData.SSN || "",
      DOB: savedData.DOB ? dayjs(savedData.DOB) : null,
      CurrentAddress: {
        AddressLine1: savedData.Address?.[0]?.AddressLine1 || "",
        AddressLine2: savedData.Address?.[0]?.AddressLine2 || "",
        City: savedData.Address?.[0]?.City || "",
        State: savedData.Address?.[0]?.State || "",
        ZipCode: savedData.Address?.[0]?.ZipCode || "",
      },
    };

    form.setFieldsValue(formData);

    // Set avatar if exists or use default
    const avatarDoc = savedData.PersonalDocument?.find(
      (doc) => doc.Title === "Profile Picture",
    );
    if (avatarDoc) {
      setAvatarUrl(avatarDoc.Path);
    }
  }, [form, loadOnboardingData, setAvatarUrl]);

  const onFinish = async (values: BasicInfoFormData) => {
    try {
      // Get existing onboarding data
      const existingData = loadOnboardingData();

      // Prepare updated data
      const updatedData = {
        ...existingData,
        ID: existingData.ID || `emp_${Date.now()}`,
        UserID: existingData.UserID || `user_auth_${Date.now()}`,
        FirstName: values.FirstName,
        LastName: values.LastName,
        MiddleName: values.MiddleName || "",
        PreferredName: values.PreferredName || "",
        Email: values.Email,
        CellPhone: values.CellPhone,
        AlternatePhone: values.AlternatePhone || "",
        Gender: values.Gender,
        SSN: values.SSN,
        DOB: dayjs(values.DOB).toISOString(),
        ApplicationType: "ONBOARDING",
        // Initialize arrays if they don't exist
        Contact: existingData.Contact || [],
        VisaStatus: existingData.VisaStatus || [],
        PersonalDocument: existingData.PersonalDocument || [],
        // Update Address array
        Address: [
          {
            ID: existingData.Address?.[0]?.ID || `addr_${Date.now()}`,
            AddressLine1: values.CurrentAddress.AddressLine1,
            AddressLine2: values.CurrentAddress.AddressLine2 || "",
            City: values.CurrentAddress.City,
            State: values.CurrentAddress.State,
            ZipCode: values.CurrentAddress.ZipCode,
          },
        ],
      };

      // Handle avatar document
      if (values.avatar && values.avatar.length > 0) {
        const avatarDoc = {
          ID: `doc_avatar_${Date.now()}`,
          Path: avatarUrl,
          Title: "Profile Picture",
          Comment: "Employee avatar image",
          CreateDate: new Date().toISOString(),
        };

        // Remove existing avatar document if present
        updatedData.PersonalDocument = updatedData.PersonalDocument.filter(
          (doc) => doc.Title !== "Profile Picture",
        );

        // Add new avatar document
        updatedData.PersonalDocument.push(avatarDoc);
      }

      // Save updated data
      updateOnboardingData(updatedData);

      message.success("Basic information saved successfully!");

      // Log the complete data structure
      console.log("Complete Onboarding Data:", updatedData);

      return true;
    } catch (error) {
      message.error("Failed to save basic information");
      console.error("Error saving data:", error);
      return false;
    }
  };

  return (
    <StepsForm
      current={0}
      onFinish={onFinish}
      formProps={{
        form,
        layout: "vertical",
        size: "large",
      }}
      stepsProps={{
        size: "default",
        className: "mb-8",
      }}
    >
      <StepsForm.StepForm
        name="basicInfo"
        title="Basic Information"
        stepProps={{
          description: "Please fill in your personal details",
        }}
        onFinish={onFinish}
        layout="vertical"
      >
        {/* Name Fields */}
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

        {/* Contact Information */}
        <ProFormText
          name="Email"
          label="Email"
          placeholder="Enter your email address"
          rules={[
            { required: true, message: "Please enter your email" },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
          fieldProps={{
            disabled: true, // Pre-filled and not editable as per spec
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
              message: "Please enter phone in format: XXX-XXX-XXXX",
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
              pattern: /^\d{3}-\d{3}-\d{4}$/,
              message: "Please enter phone in US format",
            },
          ]}
          className="mb-4"
        />

        {/* Personal Information */}
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

        {/* Current Address */}
        <div className="lg:col-span-2">
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
              className="mb-4"
            />
          </div>
        </div>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default EmployeeOnboard;
