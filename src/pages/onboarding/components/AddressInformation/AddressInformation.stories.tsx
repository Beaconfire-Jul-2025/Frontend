import React from 'react';
import AddressInformation from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AddressInformation> = {
  title: 'Onboarding/AddressInformation',
  component: AddressInformation,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof AddressInformation>;

const sampleAddresses = [
  {
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    type: 'PRIMARY',
  },
];

export const Default: Story = {
  args: {
    initialValues: { addresses: [{ addressLine1: '', addressLine2: '', city: '', state: '', zipCode: '', type: 'PRIMARY' }] },
    onFinish: () => {},
    onCancel: () => {},
  },
};

export const WithInitialData: Story = {
  args: {
    initialValues: { addresses: sampleAddresses },
    onFinish: () => {},
    onCancel: () => {},
  },
};

export const MultipleAddresses: Story = {
  args: {
    initialValues: {
      addresses: [
        ...sampleAddresses,
        {
          addressLine1: '456 Elm St',
          addressLine2: '',
          city: 'Brooklyn',
          state: 'NY',
          zipCode: '11201',
          type: 'SECONDARY',
        },
      ],
    },
    onFinish: () => {},
    onCancel: () => {},
  },
};
