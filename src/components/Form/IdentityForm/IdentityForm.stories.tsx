import React from 'react';
import { Form } from 'antd';
import IdentityForm from './index';
import type { IdentityInfo } from './data';
import dayjs from 'dayjs';

export default {
  title: 'Form/IdentityForm',
  component: IdentityForm,
};

const defaultValue: IdentityInfo = {
  ssn: '',
  gender: '',
  dob: '',
};

const filledValue: IdentityInfo = {
  ssn: '123-45-6789',
  gender: 'Male',
  dob: dayjs('1990-01-01'),
};

export const Empty = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} initialValues={defaultValue} layout="vertical">
      <IdentityForm value={defaultValue} />
    </Form>
  );
};

export const Filled = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} initialValues={filledValue} layout="vertical">
      <IdentityForm value={filledValue} />
    </Form>
  );
};
