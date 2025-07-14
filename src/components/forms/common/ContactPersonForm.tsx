// src/components/forms/ContactPersonForm.tsx
import React from "react";
import { ProFormSelect, ProCard } from "@ant-design/pro-components";
import type { FormData } from "@/types/employee.ts";
import { NameInfoForm } from "./NameInfoForm";
import { ContactInfoForm } from "./ContactInfoForm";

interface ContactPersonFormProps {
  initialValues?: Partial<FormData>;
}

export const ContactPersonForm: React.FC<ContactPersonFormProps> = ({
  initialValues,
}) => {
  // Transform emergency contact data to match the expected format for the common forms
  const emergencyContactData = initialValues?.EmergencyContacts?.[0]
    ? {
        FirstName: initialValues.EmergencyContacts[0].FirstName,
        LastName: initialValues.EmergencyContacts[0].LastName,
        MiddleName: initialValues.EmergencyContacts[0].MiddleName,
        Email: initialValues.EmergencyContacts[0].Email,
        CellPhone: initialValues.EmergencyContacts[0].CellPhone,
      }
    : undefined;

  return (
    <>
      {/* Emergency Contact Information Card */}
      <ProCard
        title="Emergency Contact Information"
        bordered
        headerBordered
        style={{
          marginBlockEnd: 16,
          minWidth: 800,
          maxWidth: "100%",
        }}
      >
        <NameInfoForm initialValues={emergencyContactData} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <ProFormSelect
            name={["EmergencyContacts", 0, "Relationship"]}
            label="Relationship *"
            placeholder="Select relationship"
            rules={[
              { required: true, message: "Please select the relationship" },
            ]}
            options={[
              { label: "Parent", value: "Parent" },
              { label: "Spouse", value: "Spouse" },
              { label: "Sibling", value: "Sibling" },
              { label: "Child", value: "Child" },
              { label: "Friend", value: "Friend" },
              { label: "Other", value: "Other" },
            ]}
            className="mb-4"
            initialValue={initialValues?.EmergencyContacts?.[0]?.Relationship}
          />
        </div>
      </ProCard>

      {/* Contact Details Card */}
      <ProCard
        title="Contact Details"
        bordered
        headerBordered
        style={{
          minWidth: 800,
          maxWidth: "100%",
        }}
      >
        <ContactInfoForm initialValues={emergencyContactData} />
      </ProCard>
    </>
  );
};
