import React from 'react';
import { Form, Button, Space, Card } from 'antd';
import { NameForm } from '@/components/Form/NameForm';
import ContactForm from '@/components/Form/ContactForm';
import IdentityForm from '@/components/Form/IdentityForm';
import type { NameData } from '@/components/Form/NameForm/data';
import type { ContactFormProps } from '@/components/Form/ContactForm/data';
import type { IdentityInfo } from '@/components/Form/IdentityForm/data';

export interface BasicInformationValues {
  name: NameData;
  contact: ContactFormProps['initialValues'];
  identity: IdentityInfo;
}

interface BasicInformationProps {
  initialValues?: Partial<BasicInformationValues>;
  onFinish: (values: BasicInformationValues) => void;
  onCancel: () => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ initialValues, onFinish, onCancel }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onFinish(values as BasicInformationValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      style={{ maxWidth: 700, margin: '0 auto' }}
    >
      <Card title="Name Information" style={{ marginBottom: 24 }}>
        <Form.Item noStyle shouldUpdate>
          {() => <NameForm />}
        </Form.Item>
      </Card>
      <Card title="Contact Information" style={{ marginBottom: 24 }}>
        <Form.Item noStyle shouldUpdate>
          {() => <ContactForm />}
        </Form.Item>
      </Card>
      <Card title="Identity Information" style={{ marginBottom: 24 }}>
        <Form.Item noStyle shouldUpdate>
          {() => <IdentityForm />}
        </Form.Item>
      </Card>
      <Form.Item style={{ textAlign: 'center', marginTop: 32 }}>
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">Next Step</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default BasicInformation;
