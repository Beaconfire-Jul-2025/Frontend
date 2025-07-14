import React from "react";
import { Form, Input, DatePicker, Select } from "antd";

interface IdentityVerificationFormProps {
  form: any;
}

export const IdentityVerificationForm: React.FC<
  IdentityVerificationFormProps
> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Form.Item
        label="Date of Birth"
        name="dob"
        rules={[{ required: true, message: "Please select date of birth" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select gender" }]}
      >
        <Select>
          <Select.Option value="Male">Male</Select.Option>
          <Select.Option value="Female">Female</Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="SSN"
        name="ssn"
        rules={[{ required: true, message: "Please enter SSN" }]}
      >
        <Input />
      </Form.Item>
    </div>
  );
};
