import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Form } from 'antd';
import React from 'react';
import VisaUpdateForm from './VisaUpdateForm';

const meta: Meta<typeof VisaUpdateForm> = {
  title: 'Form/WorkAuthorization/VisaUpdateForm',
  component: VisaUpdateForm,
};

export default meta;

type Story = StoryObj<typeof VisaUpdateForm>;

export const Default: Story = {
  render: () => (
    <Form layout="vertical">
      <VisaUpdateForm />
    </Form>
  ),
};
