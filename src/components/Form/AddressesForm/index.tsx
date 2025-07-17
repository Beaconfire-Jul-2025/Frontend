import React from 'react';
import { Card, Space, Button, Form } from 'antd';
import AddressForm from '@/components/Form/AddressForm';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

export interface AddressesFormValues {
  addresses: any[];
}

interface AddressesFormProps {
  formInstance?: any;
  minAddresses?: number;
  maxAddresses?: number;
  onCancel?: () => void;
  showAddressType?: boolean;
  disabled?: boolean;
}

const AddressesForm: React.FC<AddressesFormProps> = ({
  formInstance,
  minAddresses = 1,
  maxAddresses = 5,
  onCancel,
  showAddressType = true,
  disabled = false,
}) => {
  return (
    <>
      <Card title="Address Information" style={{ marginBottom: 24 }}>
        <Form.List name="addresses">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  key={key}
                  size="small"
                  title={`Address ${name + 1}`}
                  extra={
                    fields.length > minAddresses && !disabled && (
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                        size="small"
                        title="Remove address"
                      >
                        Remove
                      </Button>
                    )
                  }
                  style={{ marginBottom: 16 }}
                >
                  <AddressForm name={name} showAddressType={showAddressType} disabled={disabled} />
                </Card>
              ))}
              {!disabled && fields.length < maxAddresses && (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    style={{ marginBottom: 16 }}
                  >
                    Add Address
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
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
