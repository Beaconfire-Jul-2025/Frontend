import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import CreateForm from './CreateForm';

const meta: Meta<typeof CreateForm> = {
  title: 'HR/CreateForm',
  component: CreateForm,
  parameters: {
    controls: { expanded: true },
  },
};
export default meta;

type Story = StoryObj<typeof CreateForm>;

export const Default: Story = {
  render: () => <CreateForm />,
};
