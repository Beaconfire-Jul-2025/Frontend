import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import mockEmployees from './_mock';
import type { EmployeeTableView } from './data';
import EmployeeTable from './index';

// Fake service for Storybook compatibility
const _fetchEmployees = async () => {
  return mockEmployees[0].response();
};

const meta: Meta<typeof EmployeeTable> = {
  title: 'Table/EmployeeTable',
  component: EmployeeTable,
  parameters: {
    controls: { expanded: true },
  },
};
export default meta;

type Story = StoryObj<typeof EmployeeTable>;

const Template = (args: any) => <EmployeeTable {...args} />;

export const VisaView: Story = {
  render: Template,
  args: {
    view: 'visa' as EmployeeTableView,
    onRowClick: (record: any) => {
      // eslint-disable-next-line no-console
      console.log('Row clicked', record);
    },
  },
};

export const ApplicationView: Story = {
  render: Template,
  args: {
    view: 'application' as EmployeeTableView,
  },
};

export const ProfileView: Story = {
  render: Template,
  args: {
    view: 'profile' as EmployeeTableView,
  },
};

export const RoommateView: Story = {
  render: Template,
  args: {
    view: 'roommate' as EmployeeTableView,
  },
};

export const HiringView: Story = {
  render: Template,
  args: {
    view: 'hiring' as EmployeeTableView,
  },
};
