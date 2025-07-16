import React from 'react';
import { Form, Button, Card, Space } from 'antd';
import AddressForm from '@/components/Form/AddressForm';

export interface AddressesFormValues {
  addresses: any[];
}

interface AddressesFormProps {
  initialValues?: Partial<AddressesFormValues>;
  onFinish: (values: AddressesFormValues) => void;
  onCancel: () => void;
  minAddresses?: number;
  maxAddresses?: number;
}

const AddressesForm: React.FC<AddressesFormProps> = ({
  initialValues,
  onFinish,
  onCancel,
  minAddresses = 1,
  maxAddresses = 5,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onFinish(values as AddressesFormValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      style={{ maxWidth: 700, margin: '0 auto' }}
    >
      <Card title="Address Information" style={{ marginBottom: 24 }}>
        <AddressForm form={form} minAddresses={minAddresses} maxAddresses={maxAddresses} />
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

export default AddressesForm;

