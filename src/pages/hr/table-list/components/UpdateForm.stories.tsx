import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import UpdateForm from './UpdateForm';

const meta: Meta<typeof UpdateForm> = {
  title: 'HR/UpdateForm',
  component: UpdateForm,
  parameters: {
    controls: { expanded: true },
  },
};
export default meta;

type Story = StoryObj<typeof UpdateForm>;

export const Default: Story = {
  render: () => (
    <UpdateForm values={{ name: 'Rule 1', desc: 'Description 1' }} />
  ),
};
