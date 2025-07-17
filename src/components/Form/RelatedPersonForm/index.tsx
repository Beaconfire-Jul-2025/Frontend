import React from 'react';
import {NameForm} from '@/components/Form/NameForm';
import ContactForm from '@/components/Form/ContactForm';
import AddressForm from '@/components/Form/AddressForm';

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
    {/* Name fields */}
    <NameForm initialValues={undefined} />
    {/* Contact fields */}
    <ContactForm disabled={disabled} />
    {/* Address fields */}
    <AddressForm form={formInstance} minAddresses={minAddresses} maxAddresses={maxAddresses} />
  </>
);

export default RelatedPersonForm;

