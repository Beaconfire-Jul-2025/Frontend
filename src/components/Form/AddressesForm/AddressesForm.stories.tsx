import React from 'react';
import AddressesForm, { AddressesFormValues } from '@/components/Form/AddressesForm';

export default {
  title: 'Form/AddressesForm',
  component: AddressesForm,
};

const defaultAddresses = [
  {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
  },
  {
    street: '456 Market St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'USA',
  },
];

export const Default = () => (
  <AddressesForm
    initialValues={{ addresses: defaultAddresses }}
    onFinish={() => {}}
    onCancel={() => {}}
  />
);

export const WithMinMax = () => (
  <AddressesForm
    initialValues={{ addresses: [defaultAddresses[0]] }}
    onFinish={() => {}}
    onCancel={() => {}}
    minAddresses={2}
    maxAddresses={3}
  />
);

export const Empty = () => (
  <AddressesForm
    onFinish={() => {}}
    onCancel={() => {}}
  />
);
