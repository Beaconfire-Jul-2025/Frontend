import { Form } from 'antd';
import React from 'react';
import AddressesForm from '@/components/Form/AddressesForm';

export interface AddressInformationValues {
  addresses: any[];
}

interface AddressInformationProps {
  initialValues?: Partial<AddressInformationValues>;
  onFinish: (values: AddressInformationValues) => void;
  onCancel: () => void;
}

const AddressInformation: React.FC<AddressInformationProps> = ({
  initialValues,
  onFinish,
  onCancel,
}) => {
  const [form] = Form.useForm();

  return (
    <>
      <AddressesForm
        formInstance={form}
        onCancel={onCancel}
        minAddresses={1}
        maxAddresses={5}
      />
      <Form.Item style={{ textAlign: 'center', marginTop: 32 }}>
        <button type="submit">Next Step</button>
      </Form.Item>
    </>
  );
};

export default AddressInformation;
