// src/components/forms/EssentialInfoForm.tsx
import React, { useMemo } from "react";
import { ProFormText, ProCard } from "@ant-design/pro-components";
import type { FormData } from "@/types/employee";

interface EssentialInfoFormProps {
  initialValues?: Partial<FormData>;
}

export const EssentialInfoForm: React.FC<EssentialInfoFormProps> = ({
  initialValues,
}) => {
  const primaryAddress = useMemo(() => {
    return initialValues?.Addresses?.find((addr) => addr.Type === "PRIMARY");
  }, [initialValues?.Addresses]);

  return (
    <>
      {/* Personal Information Card */}
      <ProCard
        title="Personal Information"
        bordered
        headerBordered
        collapsible
        style={{
          marginBlockEnd: 16,
          minWidth: 800,
          maxWidth: "100%",
        }}
      >
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
      </ProCard>

      {/* Contact Information Card */}
      <ProCard
        title="Contact Information"
        bordered
        headerBordered
        collapsible
        style={{
          marginBlockEnd: 16,
          minWidth: 800,
          maxWidth: "100%",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </ProCard>

      {/* Address Information Card */}
      <ProCard
        title="Current Address"
        bordered
        headerBordered
        collapsible
        style={{
          minWidth: 800,
          maxWidth: "100%",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProFormText
            name={["Addresses", "PRIMARY", "AddressLine1"]}
            label="Address Line 1 *"
            placeholder="Enter your street address"
            rules={[{ required: true, message: "Please enter your address" }]}
            className="mb-4"
            initialValue={primaryAddress?.AddressLine1}
          />

          <ProFormText
            name={["Addresses", "PRIMARY", "AddressLine2"]}
            label="Address Line 2"
            placeholder="Apartment, suite, unit, etc. (optional)"
            className="mb-4"
            initialValue={primaryAddress?.AddressLine2}
          />

          <ProFormText
            name={["Addresses", "PRIMARY", "City"]}
            label="City *"
            placeholder="Enter your city"
            rules={[{ required: true, message: "Please enter your city" }]}
            className="mb-4"
            initialValue={primaryAddress?.City}
          />

          <ProFormText
            name={["Addresses", "PRIMARY", "State"]}
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
            initialValue={primaryAddress?.State}
          />

          <div className="md:col-span-2">
            <ProFormText
              name={["Addresses", "PRIMARY", "ZipCode"]}
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
              initialValue={primaryAddress?.ZipCode}
            />
          </div>
        </div>
      </ProCard>
    </>
  );
};
