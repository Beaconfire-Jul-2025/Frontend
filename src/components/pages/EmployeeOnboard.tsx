import React, { useMemo, useState } from "react";
import { StepsForm } from "@ant-design/pro-components";
import { message } from "antd";
import { useFormData } from "@/hooks/useFormData.ts";
import { useFormDataSaving } from "@/hooks/useFormDataSaving.ts";
import {
  NameInfoForm,
  AddressInfoForm,
  ContactInfoForm,
  PersonalInfoForm,
  DriverLicenseForm,
} from "@/components/forms";
import type { FormData } from "@/types/employee.ts";
import { WelcomeSplash, SuccessScreen } from "@/components/pages/results";

const EmployeeOnboard: React.FC = () => {
  const { loadFormData, removeFormData } = useFormData();
  const { saveStepData } = useFormDataSaving();

  const [currentView, setCurrentView] = useState<
    "welcome" | "onboarding" | "success"
  >("welcome");

  const handleStepFinish = async (values: FormData): Promise<boolean> => {
    return saveStepData(values);
  };

  const onFinish = async (values: FormData): Promise<boolean> => {
    try {
      await saveStepData(values);
      message.success("Onboarding information saved successfully!");

      const finalData = loadFormData();
      console.log("Complete Onboarding Data:", finalData);

      removeFormData();
      setCurrentView("success");
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

  // Render based on currentView state
  if (currentView === "welcome") {
    return <WelcomeSplash onStart={() => setCurrentView("onboarding")} />;
  }

  if (currentView === "success") {
    return <SuccessScreen />;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Employee Onboarding
        </h1>
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
      </div>
    </div>
  );
};

export default EmployeeOnboard;
