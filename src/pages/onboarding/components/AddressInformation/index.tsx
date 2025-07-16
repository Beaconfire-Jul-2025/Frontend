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

const AddressInformation: React.FC<AddressInformationProps> = ({ initialValues, onFinish, onCancel }) => {
  return (
    <AddressesForm
      initialValues={initialValues}
      onFinish={onFinish}
      onCancel={onCancel}
      // You can pass minAddresses and maxAddresses as needed
    />
  );
};

export default AddressInformation;
