// src/components/forms/ContactPersonForm.tsx
import React from "react";
import { ProFormText, ProFormSelect } from "@ant-design/pro-components";
import { AddressInfoForm } from "./AddressInfoForm";
import type { FormData } from "@/types/employee";

interface ContactPersonFormProps {
  fieldPrefix: string[];
  title: string;
  initialValues?: Partial<FormData>;
  showPhone?: boolean;
  showAlternatePhone?: boolean;
}

export const ContactPersonForm: React.FC<ContactPersonFormProps> = ({
  fieldPrefix,
  title,
  initialValues,
  showPhone = true,
  showAlternatePhone = false,
}) => {
  const relationshipOptions = [
    { label: "Spouse", value: "Spouse" },
    { label: "Parent", value: "Parent" },
    { label: "Child", value: "Child" },
    { label: "Sibling", value: "Sibling" },
    { label: "Friend", value: "Friend" },
    { label: "Relative", value: "Relative" },
    { label: "Colleague", value: "Colleague" },
    { label: "Supervisor", value: "Supervisor" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className="max-w-4xl">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ProFormText
          name={[...fieldPrefix, "FirstName"]}
          label="First Name *"
          placeholder="Enter first name"
          rules={[{ required: true, message: "Please enter first name" }]}
          className="mb-4"
        />

        <ProFormText
          name={[...fieldPrefix, "LastName"]}
          label="Last Name *"
          placeholder="Enter last name"
          rules={[{ required: true, message: "Please enter last name" }]}
          className="mb-4"
        />

        <ProFormText
          name={[...fieldPrefix, "MiddleName"]}
          label="Middle Name"
          placeholder="Enter middle name (optional)"
          className="mb-4"
        />

        <ProFormSelect
          name={[...fieldPrefix, "Relationship"]}
          label="Relationship *"
          placeholder="Select relationship"
          options={relationshipOptions}
          rules={[{ required: true, message: "Please select relationship" }]}
          className="mb-4"
        />

        {showPhone && (
          <ProFormText
            name={[...fieldPrefix, showAlternatePhone ? "CellPhone" : "Phone"]}
            label="Phone *"
            placeholder="Enter phone number"
            rules={[
              { required: true, message: "Please enter phone number" },
              {
                pattern: /^[\d\s\-\(\)\+\.]+$/,
                message: "Please enter a valid phone number",
              },
            ]}
            className="mb-4"
          />
        )}

        {showAlternatePhone && (
          <ProFormText
            name={[...fieldPrefix, "AlternatePhone"]}
            label="Alternate Phone"
            placeholder="Enter alternate phone number (optional)"
            rules={[
              {
                pattern: /^[\d\s\-\(\)\+\.]+$/,
                message: "Please enter a valid phone number",
              },
            ]}
            className="mb-4"
          />
        )}

        <ProFormText
          name={[...fieldPrefix, "Email"]}
          label="Email *"
          placeholder="Enter email address"
          rules={[
            { required: true, message: "Please enter email address" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
          className="mb-4"
        />
      </div>

      {/* Address Section */}
      <div className="mt-6">
        <h4 className="text-md font-medium mb-4 text-gray-700">
          Address Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProFormText
            name={[...fieldPrefix, "Address", "AddressLine1"]}
            label="Address Line 1 *"
            placeholder="Enter street address"
            rules={[{ required: true, message: "Please enter address" }]}
            className="mb-4"
          />

          <ProFormText
            name={[...fieldPrefix, "Address", "AddressLine2"]}
            label="Address Line 2"
            placeholder="Apartment, suite, unit, etc. (optional)"
            className="mb-4"
          />

          <ProFormText
            name={[...fieldPrefix, "Address", "City"]}
            label="City *"
            placeholder="Enter city"
            rules={[{ required: true, message: "Please enter city" }]}
            className="mb-4"
          />

          <ProFormText
            name={[...fieldPrefix, "Address", "State"]}
            label="State *"
            placeholder="Enter state"
            rules={[
              { required: true, message: "Please enter state" },
              {
                len: 2,
                message: "Please enter state as 2-letter code (e.g., NY)",
              },
            ]}
            className="mb-4"
          />

          <div className="md:col-span-2">
            <ProFormText
              name={[...fieldPrefix, "Address", "ZipCode"]}
              label="ZIP Code *"
              placeholder="Enter ZIP code"
              rules={[
                { required: true, message: "Please enter ZIP code" },
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
    </div>
  );
};
