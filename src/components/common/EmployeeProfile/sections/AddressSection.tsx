// AddressSection.tsx
import React from "react";
import { Space, Form } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AddressInfoForm } from "@/components/forms";
import { SectionHeader } from "../components/SectionHeader";
import { AddressCard } from "@/components/common/EmployeeProfile/components/AddressCard";
import type { SectionProps } from "../types";
import type { Address } from "@/types/employee";

interface AddressSectionProps extends SectionProps {
  isEditing: boolean;
  form: any;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  employee,
  mode,
  onEdit,
  onSave,
  onCancel,
  isEditing,
  form,
}) => {
  const handleEdit = () => {
    if (!onEdit) return;

    const primaryAddress = employee.addresses.find(
      (addr: Address) => addr.type === "PRIMARY",
    );
    const secondaryAddress = employee.addresses.find(
      (addr: Address) => addr.type === "SECONDARY",
    );

    form.setFieldsValue({
      primaryAddressLine1: primaryAddress?.addressLine1,
      primaryAddressLine2: primaryAddress?.addressLine2,
      primaryCity: primaryAddress?.city,
      primaryState: primaryAddress?.state,
      primaryZipCode: primaryAddress?.zipCode,
      secondaryAddressLine1: secondaryAddress?.addressLine1,
      secondaryAddressLine2: secondaryAddress?.addressLine2,
      secondaryCity: secondaryAddress?.city,
      secondaryState: secondaryAddress?.state,
      secondaryZipCode: secondaryAddress?.zipCode,
    });
    onEdit("address");
  };

  return (
    <ProCard
      title={
        <Space>
          <HomeOutlined />
          Address Information
        </Space>
      }
      headerBordered
      extra={
        <SectionHeader
          canEdit={mode === "employee"}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={onSave}
          onCancel={onCancel}
        />
      }
    >
      {isEditing ? (
        <Form form={form} layout="vertical">
          <AddressInfoForm form={form} />
        </Form>
      ) : (
        <div className="space-y-4">
          {employee.addresses.map((addr: Address) => (
            <AddressCard key={addr.type} address={addr} />
          ))}
        </div>
      )}
    </ProCard>
  );
};
