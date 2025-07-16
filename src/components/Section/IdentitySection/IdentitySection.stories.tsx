import React, { useState } from 'react';
import IdentitySection from './index';
import type { IdentityInfo } from './data';
import { Form } from 'antd';
import dayjs from 'dayjs';

export default {
  title: 'Section/IdentitySection',
  component: IdentitySection,
};

const baseValue: IdentityInfo = {
  ssn: '987-65-4321',
  gender: 'Other',
  dob: dayjs('2000-12-31'),
};

export const Readonly = () => {
  const [form] = Form.useForm();
  return (
    <IdentitySection value={baseValue} isEditing={false} form={form} mode="readonly" />
  );
};

export const Editable = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(baseValue);
  return (
    <IdentitySection
      value={data}
      isEditing={isEditing}
      form={form}
      mode="employee"
      onEdit={() => setIsEditing(true)}
      onSave={values => {
        setData(values);
        setIsEditing(false);
      }}
      onCancel={() => setIsEditing(false)}
    />
  );
};
