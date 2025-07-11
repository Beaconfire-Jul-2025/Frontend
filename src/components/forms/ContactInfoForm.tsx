import React from "react";
import { ProFormText } from "@ant-design/pro-components";
import type { FormData } from "@/types/employee";

interface ContactInfoFormProps {
  initialValues?: Partial<FormData>;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  initialValues,
}) => {
  return (
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
          disabled: false,
        }}
        className="mb-4"
        initialValue={initialValues?.Email}
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
            pattern: /^\d{3}-\d{3}-\d{4}$/,
            message: "Please enter phone in format: XXX-XXX-XXXX",
          },
        ]}
        className="mb-4"
        initialValue={initialValues?.CellPhone}
      />

      <ProFormText
        name="WorkPhone"
        label="Work Phone"
        placeholder="Enter your work phone number (optional)"
        rules={[
          {
            pattern: /^\d{3}-\d{3}-\d{4}$/,
            message: "Please enter phone in format: XXX-XXX-XXXX",
          },
        ]}
        className="mb-4"
        initialValue={initialValues?.WorkPhone}
      />
    </div>
  );
};
