import React from "react";
import { Space, Descriptions, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { Typography } from "antd";
import { NameInfoForm } from "@/components/forms";
import type { SectionProps } from "../types";
import { SectionHeader } from "../components/SectionHeader";

const { Text } = Typography;

interface NameSectionProps extends SectionProps {
  isEditing: boolean;
  form: any;
}

export const NameSection: React.FC<NameSectionProps> = ({
  employee,
  mode,
  onEdit,
  onSave,
  onCancel,
  isEditing,
  form,
}) => {
  const getFullName = () => {
    const parts = [
      employee.firstName,
      employee.middleName,
      employee.lastName,
    ].filter(Boolean);
    return parts.join(" ");
  };

  const handleEdit = () => {
    if (onEdit) {
      form.setFieldsValue({
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        preferredName: employee.preferredName,
      });
      onEdit("name");
    }
  };

  return (
    <ProCard
      title={
        <Space>
          <UserOutlined />
          Name Information
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
          <NameInfoForm form={form} />
        </Form>
      ) : (
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="Legal Name" span={2}>
            <Text strong>{getFullName()}</Text>
          </Descriptions.Item>
          {employee.preferredName && (
            <Descriptions.Item label="Preferred Name" span={2}>
              {employee.preferredName}
            </Descriptions.Item>
          )}
        </Descriptions>
      )}
    </ProCard>
  );
};
