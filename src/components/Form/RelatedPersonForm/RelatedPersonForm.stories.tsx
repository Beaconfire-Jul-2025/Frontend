import React from 'react';
import RelatedPersonForm, { RelatedPersonFormProps } from './index';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Form } from 'antd';

const meta: Meta<typeof RelatedPersonForm> = {
  title: 'Form/RelatedPersonForm',
  component: RelatedPersonForm,
};
export default meta;

type Story = StoryObj<typeof RelatedPersonForm>;

export const Default: Story = {
  render: (args) => {
    const [form] = Form.useForm();
    return <RelatedPersonForm {...args} formInstance={form} />;
  },
};

export const WithCustomAddresses: Story = {
  render: (args) => {
    const [form] = Form.useForm();
    return (
      <RelatedPersonForm
        {...args}
        formInstance={form}
        minAddresses={2}
        maxAddresses={3}
        disabled={false}
      />
    );
  },
};

