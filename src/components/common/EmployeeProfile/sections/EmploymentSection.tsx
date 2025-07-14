import React from "react";
import {
  Space,
  Descriptions,
  Form,
  Input,
  DatePicker,
  Select,
  Tag,
  Typography,
} from "antd";
import { GlobalOutlined, CalendarOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import dayjs from "dayjs";
import type { SectionProps } from "../types";
import { SectionHeader } from "../components/SectionHeader";

const { Title } = Typography;

interface EmploymentSectionProps extends SectionProps {
  isEditing: boolean;
  form: any;
}

export const EmploymentSection: React.FC<EmploymentSectionProps> = ({
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
        isUsCitizen: employee.workAuthorization.isUsCitizen,
        greenCardHolder: employee.workAuthorization.greenCardHolder,
        workAuthType: employee.workAuthorization.type,
        workAuthStartDate: employee.workAuthorization.startDate
          ? dayjs(employee.workAuthorization.startDate)
          : null,
        workAuthEndDate: employee.workAuthorization.endDate
          ? dayjs(employee.workAuthorization.endDate)
          : null,
        employmentStartDate: dayjs(employee.startDate),
        employmentEndDate: employee.endDate ? dayjs(employee.endDate) : null,
      });
      onEdit("employment");
    }
  };

  return (
    <ProCard
      title={
        <Space>
          <GlobalOutlined />
          Employment Information
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
          <Title level={5}>Work Authorization</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Form.Item label="US Citizen" name="isUsCitizen">
              <Select>
                <Select.Option value={true}>Yes</Select.Option>
                <Select.Option value={false}>No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Green Card Holder" name="greenCardHolder">
              <Select>
                <Select.Option value={true}>Yes</Select.Option>
                <Select.Option value={false}>No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Work Authorization Type" name="workAuthType">
              <Input />
            </Form.Item>
            <Form.Item label="Work Auth Start Date" name="workAuthStartDate">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Work Auth End Date" name="workAuthEndDate">
              <DatePicker />
            </Form.Item>
          </div>

          <Title level={5}>Employment Dates</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Employment Start Date" name="employmentStartDate">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Employment End Date" name="employmentEndDate">
              <DatePicker />
            </Form.Item>
          </div>
        </Form>
      ) : (
        <div className="space-y-4">
          <Descriptions
            column={2}
            bordered
            size="small"
            title="Work Authorization"
          >
            <Descriptions.Item label="US Citizen">
              <Tag
                color={employee.workAuthorization.isUsCitizen ? "green" : "red"}
              >
                {employee.workAuthorization.isUsCitizen ? "Yes" : "No"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Green Card Holder">
              <Tag
                color={
                  employee.workAuthorization.greenCardHolder ? "green" : "red"
                }
              >
                {employee.workAuthorization.greenCardHolder ? "Yes" : "No"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Type" span={2}>
              {employee.workAuthorization.type}
            </Descriptions.Item>
            {employee.workAuthorization.startDate && (
              <Descriptions.Item label="Work Auth Start Date">
                {formatDate(employee.workAuthorization.startDate)}
              </Descriptions.Item>
            )}
            {employee.workAuthorization.endDate && (
              <Descriptions.Item label="Work Auth End Date">
                {formatDate(employee.workAuthorization.endDate)}
              </Descriptions.Item>
            )}
          </Descriptions>

          <Descriptions
            column={2}
            bordered
            size="small"
            title="Employment Dates"
          >
            <Descriptions.Item label="Employment Start Date">
              <Space>
                <CalendarOutlined />
                {formatDate(employee.startDate)}
              </Space>
            </Descriptions.Item>
            {employee.endDate && (
              <Descriptions.Item label="Employment End Date">
                <Space>
                  <CalendarOutlined />
                  {formatDate(employee.endDate)}
                </Space>
              </Descriptions.Item>
            )}
          </Descriptions>
        </div>
      )}
    </ProCard>
  );
};
