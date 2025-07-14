import React from "react";
import { Space, Form, Card, Tag, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AddressInfoForm } from "@/components/forms";
import type { SectionProps } from "../types";
import type { Address } from "@/types/employee.ts";
import { SectionHeader } from "../components/SectionHeader";

const { Text } = Typography;

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
  const formatAddress = (address: Address) => {
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.state,
      address.zipCode,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const handleEdit = () => {
    if (onEdit) {
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
    }
  };

  const primaryAddress = employee.addresses.find(
    (addr: Address) => addr.type === "PRIMARY",
  );
  const secondaryAddress = employee.addresses.find(
    (addr: Address) => addr.type === "SECONDARY",
  );

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
          {primaryAddress && (
            <Card size="small" className="border-l-4 border-l-blue-500">
              <div>
                <Tag color="blue">PRIMARY</Tag>
                <div className="mt-2">
                  <Text strong>{formatAddress(primaryAddress)}</Text>
                </div>
              </div>
            </Card>
          )}

          {secondaryAddress && (
            <Card size="small" className="border-l-4 border-l-orange-500">
              <div>
                <Tag color="orange">SECONDARY</Tag>
                <div className="mt-2">
                  <Text strong>{formatAddress(secondaryAddress)}</Text>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </ProCard>
  );
};
