import React from 'react';
import RelatedPeopleForm from '@/components/Form/RelatedPeopleForm';

interface ReferenceInformationProps {
  onFinish: (references: any[]) => void;
  disabled?: boolean;
}

const ReferenceInformation: React.FC<ReferenceInformationProps> = ({
  onFinish,
  disabled = false,
}) => {
  // You can pass initialValues to RelatedPeopleForm if it supports it, or manage formInstance here
  return (
    <RelatedPeopleForm
      minPeople={0}
      maxPeople={3}
      disabled={disabled}
      formInstance={null}
      onFinish={onFinish}
    />
  );
};

export default ReferenceInformation;
