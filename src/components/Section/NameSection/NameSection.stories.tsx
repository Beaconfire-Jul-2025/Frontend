import React, { useState } from 'react';
import NameSection from './index';
import type { NameSectionData } from './data';

export default {
  title: 'Section/NameSection',
  component: NameSection,
};

const baseData: NameSectionData = {
  firstName: 'John',
  middleName: 'H.',
  lastName: 'Doe',
  preferredName: 'Johnny',
};

export const Readonly = () => (
  <NameSection
    data={baseData}
    mode="readonly"
    isEditing={false}
  />
);

export const Editable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(baseData);
  return (
    <NameSection
      data={data}
      mode="employee"
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onSave={values => {
        setData(values);
        setIsEditing(false);
      }}
      onCancel={() => setIsEditing(false)}
    />
  );
};

export const NoMiddleOrPreferred = () => (
  <NameSection
    data={{ firstName: 'Jane', lastName: 'Smith' }}
    mode="readonly"
    isEditing={false}
  />
);
