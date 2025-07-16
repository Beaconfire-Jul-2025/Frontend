import React from 'react';
import AddressInformation, { AddressInformationValues } from './index';

export default {
  title: 'Onboarding/AddressInformation',
  component: AddressInformation,
  parameters: {
    layout: 'padded',
  },
};

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

const Template = (args: any) => <AddressInformation {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialValues: { addresses: [{ addressLine1: '', addressLine2: '', city: '', state: '', zipCode: '', type: 'PRIMARY' }] },
  onFinish: () => {},
  onCancel: () => {},
};

export const WithInitialData = Template.bind({});
WithInitialData.args = {
  initialValues: { addresses: sampleAddresses },
  onFinish: () => {},
  onCancel: () => {},
};

export const MultipleAddresses = Template.bind({});
MultipleAddresses.args = {
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
};
