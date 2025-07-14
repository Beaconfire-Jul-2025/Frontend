import React from "react";
import {
  Space,
  Descriptions,
  Form,
  Input,
  DatePicker,
  Select,
  Tag,
} from "antd";
import { CarOutlined, CalendarOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import dayjs from "dayjs";
import type { SectionProps } from "../types";
import { SectionHeader } from "../components/SectionHeader";

interface DriverLicenseSectionProps extends SectionProps {
  isEditing: boolean;
  form: any;
}

export const DriverLicenseSection: React.FC<DriverLicenseSectionProps> = ({
  employee,
  mode,
  onEdit,
  onSave,
  onCancel,
  isEditing,
  form,
}) => {
  const formatDate = (dateString: string) =>
    dayjs(dateString).format("MMM DD, YYYY");

  const handleEdit = () => {
    if (onEdit) {
      form.setFieldsValue({
        hasLicense: employee.driverLicense.hasLicense,
        licenseNumber: employee.driverLicense.licenseNumber,
        expirationDate: employee.driverLicense.expirationDate
          ? dayjs(employee.driverLicense.expirationDate)
          : null,
      });
      onEdit("driverLicense");
    }
  };

  return (
    <ProCard
      title={
        <Space>
          <CarOutlined />
          Driver License
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item label="Has License" name="hasLicense">
              <Select>
                <Select.Option value={true}>Yes</Select.Option>
                <Select.Option value={false}>No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="License Number" name="licenseNumber">
              <Input />
            </Form.Item>
            <Form.Item label="Expiration Date" name="expirationDate">
              <DatePicker />
            </Form.Item>
          </div>
        </Form>
      ) : (
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="Has License">
            <Tag color={employee.driverLicense.hasLicense ? "green" : "red"}>
              {employee.driverLicense.hasLicense ? "Yes" : "No"}
            </Tag>
          </Descriptions.Item>
          {employee.driverLicense.hasLicense && (
            <>
              <Descriptions.Item label="License Number">
                {employee.driverLicense.licenseNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Expiration Date" span={2}>
                <Space>
                  <CalendarOutlined />
                  {formatDate(employee.driverLicense.expirationDate)}
                </Space>
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      )}
    </ProCard>
  );
};
