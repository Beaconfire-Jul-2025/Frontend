import React from 'react';
import RelatedPeopleForm from '@/components/Form/RelatedPeopleForm';

interface EmergencyContactInformationProps {
  onFinish: (contacts: any[]) => void;
  disabled?: boolean;
}

const EmergencyContactInformation: React.FC<
  EmergencyContactInformationProps
> = ({ onFinish, disabled = false }) => {
  // You can pass initialValues to RelatedPeopleForm if it supports it, or manage formInstance here
  return (
    <RelatedPeopleForm
      minPeople={1}
      maxPeople={3}
      disabled={disabled}
      formInstance={null}
      onFinish={onFinish}
    />
  );
};

export default EmergencyContactInformation;
