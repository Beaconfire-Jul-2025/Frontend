import React from 'react';
import ContactDisplay from './index';
import type { ContactDisplayProps } from './data.d';
import { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof ContactDisplay> = {
  title: 'Information/ContactDisplay',
  component: ContactDisplay,
};
export default meta;

type Story = StoryObj<typeof ContactDisplay>;

const exampleContact: ContactDisplayProps['contact'] = {
  email: 'jane.doe@example.com',
  phone: '+1 234 567 8901',
  alternatePhone: '+1 234 567 8902',
};

export const Default: Story = {
  args: {
    contact: exampleContact,
  },
  render: (args) => <ContactDisplay {...args} />,
};

