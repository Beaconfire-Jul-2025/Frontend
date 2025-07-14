// src/components/forms/EssentialInfoForm.tsx
import React from "react";
import { ProCard } from "@ant-design/pro-components";
import type { FormData } from "@/types/employee.ts";
import { NameInfoForm } from "@/components/forms";
import { ContactInfoForm } from "@/components/forms";
import { AddressInfoForm } from "@/components/forms";

interface EssentialInfoFormProps {
  initialValues?: Partial<FormData>;
}

export const EssentialInfoForm: React.FC<EssentialInfoFormProps> = ({
  initialValues,
}) => {
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
        <NameInfoForm initialValues={initialValues} />
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
        <ContactInfoForm initialValues={initialValues} />
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
        <AddressInfoForm initialValues={initialValues} />
      </ProCard>
    </>
  );
};
