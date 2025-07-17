import React from 'react';
import { Card, Space, Button, Form } from 'antd';
import AddressForm from '@/components/Form/AddressForm';

export interface AddressesFormValues {
  addresses: any[];
}

interface AddressesFormProps {
  formInstance?: any;
  minAddresses?: number;
  maxAddresses?: number;
  onCancel?: () => void;
}

const AddressesForm: React.FC<AddressesFormProps> = ({
  formInstance,
  minAddresses = 1,
  maxAddresses = 5,
  onCancel,
}) => {
  return (
    <>
      <Card title="Address Information" style={{ marginBottom: 24 }}>
        <AddressForm form={formInstance} minAddresses={minAddresses} maxAddresses={maxAddresses} />
      </Card>
      {onCancel && (
        <Form.Item style={{ textAlign: 'center', marginTop: 32 }}>
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      )}
    </>
  );
};

export default AddressesForm;
