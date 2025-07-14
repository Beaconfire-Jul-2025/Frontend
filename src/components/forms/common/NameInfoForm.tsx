import React from "react";
import { ProFormText } from "@ant-design/pro-components";
import type { FormData } from "@/types/employee.ts";

interface NameInfoFormProps {
  initialValues?: Partial<FormData>;
}

export const NameInfoForm: React.FC<NameInfoFormProps> = ({
  initialValues,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ProFormText
        name="FirstName"
        label="First Name *"
        placeholder="Enter your first name"
        rules={[
          { required: true, message: "Please enter your first name" },
          { min: 2, message: "First name must be at least 2 characters" },
        ]}
        className="mb-4"
        initialValue={initialValues?.FirstName}
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
        initialValue={initialValues?.LastName}
      />

      <ProFormText
        name="MiddleName"
        label="Middle Name"
        placeholder="Enter your middle name (optional)"
        className="mb-4"
        initialValue={initialValues?.MiddleName}
      />

      <ProFormText
        name="PreferredName"
        label="Preferred Name"
        placeholder="Enter your preferred name (optional)"
        className="mb-4"
        initialValue={initialValues?.PreferredName}
      />
    </div>
  );
};
