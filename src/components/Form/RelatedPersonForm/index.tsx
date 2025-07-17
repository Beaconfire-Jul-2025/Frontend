import { Card } from 'antd';
import React from 'react';
import AddressForm from '@/components/Form/AddressForm';
import ContactForm from '@/components/Form/ContactForm';
import { NameForm } from '@/components/Form/NameForm';

export interface RelatedPersonFormProps {
  disabled?: boolean;
  minAddresses?: number;
  maxAddresses?: number;
  formInstance?: any;
}

const RelatedPersonForm: React.FC<RelatedPersonFormProps> = ({
  disabled,
  minAddresses = 1,
  maxAddresses = 1,
  formInstance,
}) => (
  <>
    <Card title="Name Information" style={{ marginBottom: 24 }}>
      <NameForm initialValues={undefined} />
    </Card>
    <Card title="Contact Information" style={{ marginBottom: 24 }}>
      <ContactForm disabled={disabled} />
    </Card>
    <Card title="Address Information">
      <AddressForm
        form={formInstance}
        minAddresses={minAddresses}
        maxAddresses={maxAddresses}
      />
    </Card>
  </>
);

export default RelatedPersonForm;
