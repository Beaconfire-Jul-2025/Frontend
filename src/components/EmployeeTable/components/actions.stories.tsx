import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { SecureViewAction, VisaActions } from './actions';

const meta: Meta = {
  title: 'Table/EmployeeTable/Actions',
  component: VisaActions,
};
export default meta;

export const VisaActionsStory: StoryObj = {
  render: () => <VisaActions record={{ id: '1' }} />,
};

export const SecureViewActionStory: StoryObj = {
  render: () => <SecureViewAction userId="123" mode="storybook" />,
};
