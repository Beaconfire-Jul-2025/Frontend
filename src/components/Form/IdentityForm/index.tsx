import React from 'react';
import { Form, Input, DatePicker, Select } from 'antd';
import type { IdentityFormProps, IdentityInfo } from './data';
import dayjs from 'dayjs';

const { Option } = Select;

const IdentityForm: React.FC<IdentityFormProps> = ({ value, onChange }) => {
  return (
    <>
      <Form.Item
        label="SSN"
        name="ssn"
        rules={[{ required: true, message: 'Please input SSN' }]}
      >
        <Input maxLength={11} placeholder="XXX-XX-XXXX" />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'Please select gender' }]}
      >
        <Select placeholder="Select gender">
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Date of Birth"
        name="dob"
        rules={[{ required: true, message: 'Please select date of birth' }]}
      >
        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
      </Form.Item>
    </>
  );
};

export default IdentityForm;

