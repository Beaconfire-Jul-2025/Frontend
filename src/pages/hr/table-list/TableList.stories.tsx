import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import TableList from './index';

const meta: Meta<typeof TableList> = {
  title: 'HR/TableList',
  component: TableList,
  parameters: {
    controls: { expanded: true },
  },
};
export default meta;

type Story = StoryObj<typeof TableList>;

export const Default: Story = {
  render: () => <TableList />,
};
