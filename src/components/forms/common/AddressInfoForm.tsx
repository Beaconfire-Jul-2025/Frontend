//src/components/forms/AddressInfoForm
import React from "react";
import { Form, Input, Typography } from "antd";

const { Title } = Typography;

interface AddressInfoFormProps {
  form: any;
}

export const AddressInfoForm: React.FC<AddressInfoFormProps> = ({ form }) => {
  return (
    <div>
      <Title level={5}>Primary Address</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Form.Item label="Address Line 1" name="primaryAddressLine1">
          <Input />
        </Form.Item>
        <Form.Item label="Address Line 2" name="primaryAddressLine2">
          <Input />
        </Form.Item>
        <Form.Item label="City" name="primaryCity">
          <Input />
        </Form.Item>
        <Form.Item label="State" name="primaryState">
          <Input />
        </Form.Item>
        <Form.Item label="Zip Code" name="primaryZipCode">
          <Input />
        </Form.Item>
      </div>

      <Title level={5}>Secondary Address</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item label="Address Line 1" name="secondaryAddressLine1">
          <Input />
        </Form.Item>
        <Form.Item label="Address Line 2" name="secondaryAddressLine2">
          <Input />
        </Form.Item>
        <Form.Item label="City" name="secondaryCity">
          <Input />
        </Form.Item>
        <Form.Item label="State" name="secondaryState">
          <Input />
        </Form.Item>
        <Form.Item label="Zip Code" name="secondaryZipCode">
          <Input />
        </Form.Item>
      </div>
    </div>
  );
};
