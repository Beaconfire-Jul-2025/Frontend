import React from 'react';
import { Form, Input } from 'antd';
import type { NameData } from './data';

export interface NameFormProps {
  // Only require initialValues for field default values, not for form instance
  initialValues?: NameData;
}

export const NameForm: React.FC<NameFormProps> = ({ initialValues }) => {
  return (
    <>
      <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="middleName" label="Middle Name">
        <Input />
      </Form.Item>
      <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="preferredName" label="Preferred Name">
        <Input />
      </Form.Item>
    </>
  );
};
