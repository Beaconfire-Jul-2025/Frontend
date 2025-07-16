import React from 'react';
import { Form, Input } from 'antd';
import type { NameData } from './data';

export interface NameFormProps {
  initialValues: NameData;
  onFinish: (values: NameData) => void;
  onCancel: () => void;
  formId?: string;
}

export const NameForm: React.FC<NameFormProps> = ({ initialValues, onFinish, onCancel, formId = 'name-form' }) => {
  const [form] = Form.useForm<NameData>();

  React.useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Form
      id={formId}
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
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
    </Form>
  );
};
