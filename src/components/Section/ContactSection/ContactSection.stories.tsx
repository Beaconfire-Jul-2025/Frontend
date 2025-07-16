import React from 'react';
import ContactSection from './index';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Form } from 'antd';

const meta: Meta<typeof ContactSection> = {
  title: 'Section/ContactSection',
  component: ContactSection,
};
export default meta;

type Story = StoryObj<typeof ContactSection>;

const exampleContact = {
  email: 'jane.doe@example.com',
  phone: '+1 234 567 8901',
  alternatePhone: '+1 234 567 8902',
};

export const Default: Story = {
  args: {
    contact: exampleContact,
    isEditing: false,
    editable: false,
  },
  render: (args) => {
    const [form] = Form.useForm();
    return <ContactSection {...args} form={form} />;
  },
};

export const Editable: Story = {
  args: {
    contact: exampleContact,
    editable: true,
  },
  render: (args) => {
    const [form] = Form.useForm();
    return <ContactSection {...args} form={form} />;
  },
};

export const Editing: Story = {
  args: {
    contact: exampleContact,
    isEditing: true,
    editable: true,
  },
  render: (args) => {
    const [form] = Form.useForm();
    return <ContactSection {...args} form={form} />;
  },
};
