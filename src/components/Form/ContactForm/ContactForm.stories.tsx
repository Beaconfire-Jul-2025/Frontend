import React from 'react';
import ContactForm from './index';
import type { ContactFormProps } from './data.d';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Form } from 'antd';

const meta: Meta<typeof ContactForm> = {
  title: 'Form/ContactForm',
  component: ContactForm,
};
export default meta;

type Story = StoryObj<typeof ContactForm>;

const exampleContact: ContactFormProps['initialValues'] = {
  email: 'jane.doe@example.com',
  phone: '+1 234 567 8901',
  alternatePhone: '+1 234 567 8902',
};

export const Default: Story = {
  render: (args) => {
    const [form] = Form.useForm();
    return <ContactForm {...args} form={form} />;
  },
};

export const WithInitialValues: Story = {
  render: (args) => {
    const [form] = Form.useForm();
    return <ContactForm {...args} form={form} initialValues={exampleContact} />;
  },
};
